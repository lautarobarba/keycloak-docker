import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UpdateUserDto } from 'modules/user/user.dto';
import { UserService } from 'modules/user/user.service';
import { User } from '../user/user.entity';
import { ChangePasswordDto, LoginDto, RecoverPasswordDto, SessionDto } from './auth.dto';
import { MailerService } from '../mailer/mailer.service';
import { Role } from '../auth/role.enum';

@Injectable()
export class AuthService {
	constructor(
		private readonly _userService: UserService,
		private readonly _jwtService: JwtService,
		private readonly _mailerService: MailerService
	) { }
	private readonly _logger = new Logger(AuthService.name);

	async register(
		ulrToImportCssInEmail: string,
		ulrToImportImagesInEmail: string,
		createUserDto: CreateUserDto
	): Promise<SessionDto> {
		this._logger.debug('register()');

		// Hash password
		const salt = await genSalt(10);
		const hashedPassword: string = await hash(createUserDto.password, salt);

		// Creo el usuario
		const user: User = await this._userService.create({
			...createUserDto,
			password: hashedPassword,
		});

		// Envío correo de registro a su email
		await this._mailerService.sendRegistrationEmail(
			ulrToImportCssInEmail,
			ulrToImportImagesInEmail,
			user.email,
		);

		const tokens: SessionDto = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		// Envío correo de validación de cuenta a su email
		await this.sendEmailConfirmationEmail(
			ulrToImportCssInEmail,
			ulrToImportImagesInEmail,
			user
		);

		return tokens;
	}

	async login(loginDto: LoginDto): Promise<SessionDto> {
		this._logger.debug('login()');
		const { email, password } = loginDto;
		const user: User = await this._userService.findOneByEmail(email);

		if (!user) {
			this._logger.debug('Error: User does not exists');
			throw new NotFoundException('Error: User does not exists');
		}

		const passwordMatches = await compare(password, user.password);

		if (!passwordMatches) {
			this._logger.debug('Error: Invalid password');
			throw new UnauthorizedException('Error: Invalid password');
		}

		const tokens: SessionDto = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	async refreshTokens(id: number, refreshToken: string) {
		this._logger.debug('refreshTokens()');
		const user = await this._userService.findOne(id);

		if (!user || !user.refreshToken) {
			this._logger.debug('Error: Access Denied');
			throw new ForbiddenException('Error: Access Denied');
		}

		if (refreshToken !== user.refreshToken) {
			this._logger.debug('Error: Wrong token');
			throw new ForbiddenException('Error: Wrong token');
		}

		const tokens: SessionDto = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	async changePassword(changePasswordDto: ChangePasswordDto) {
		this._logger.debug('changePassword()');
		const user = await this._userService.findOne(changePasswordDto.id);

		if (!user) {
			this._logger.debug('Error: Not Found');
			throw new NotFoundException('Error: Not Found');
		}

		// Hash password
		const salt = await genSalt(10);
		const hashedPassword: string = await hash(changePasswordDto.newPassword, salt);

		await this._userService.updatePassword(user, hashedPassword);

		const tokens: SessionDto = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);

		return tokens;
	}

	async recoverPassword(
		ulrToImportCssInEmail: string,
		ulrToImportImagesInEmail: string,
		recoverPasswordDto: RecoverPasswordDto
	) {
		this._logger.debug('recoverPassword()');
		const user = await this._userService.findOneByEmail(recoverPasswordDto.email);

		if (!user) {
			this._logger.debug('Error: Account does not exists');
			throw new NotFoundException('Error: Account does not exists');
		}

		const tokens: SessionDto = await this.getTokens(user.id, user.email);

		// Envío correo de validación de cuenta a su email
		await this._mailerService.sendRecoverPasswordEmail(
			ulrToImportCssInEmail,
			ulrToImportImagesInEmail,
			user.email,
			tokens.accessToken
		);
	}

	async logout(id: number) {
		this._logger.debug('logout()');
		return this._userService.logout(id);
	}

	async testPrivateRoute(id: number): Promise<string> {
		this._logger.debug('testPrivateRoute()');
		const user: User = await this._userService.findOne(id);
		return `Este sitio sólo se puede ver si el usuario está autenticado.\nUSER_ID: ${user.id}\nROLE: ${user.role}\nFIRST_NAME: ${user.firstname}\nLAST_NAME: ${user.lastname}\nEMAIL: ${user.email}`;
	}

	async testEmailConfirmed(id: number): Promise<string> {
		this._logger.debug('testEmailConfirmed()');
		const user: User = await this._userService.findOne(id);
		return `Este sitio sólo se puede ver si el usuario está autenticado y tiene el correo electrónico confirmado.\nUSER_ID: ${user.id}\nROLE: ${user.role}\nFIRST_NAME: ${user.firstname}\nLAST_NAME: ${user.lastname}\nEMAIL: ${user.email}`;
	}

	async testRolePermission(id: number): Promise<string> {
		this._logger.debug('testRolePermission()');
		const user: User = await this._userService.findOne(id);
		return `Este sitio sólo se puede ver si el usuario está autenticado, tiene el correo electrónico confirmado y tiene rol de ${Role.ADMIN}.\nUSER_ID: ${user.id}\nROLE: ${user.role}\nFIRST_NAME: ${user.firstname}\nLAST_NAME: ${user.lastname}\nEMAIL: ${user.email}`;
	}

	async updateRefreshToken(id: number, refreshToken: string) {
		this._logger.debug('updateRefreshToken()');
		// Hash token
		const salt = await genSalt(10);
		const hashedRefreshToken: string = await hash(refreshToken, salt);
		await this._userService.updateRefreshToken(id, refreshToken);
	}

	async getTokens(id: number, email: string): Promise<SessionDto> {
		this._logger.debug('getTokens()');
		const [accessToken, refreshToken] = await Promise.all([
			this._jwtService.signAsync(
				{
					sub: id,
					email,
				},
				{
					secret: process.env.JWT_SECRET,
					expiresIn: process.env.JWT_EXPIRATION_TIME ?? '1d',
				}
			),
			this._jwtService.signAsync(
				{
					sub: id,
					email,
				},
				{
					secret: process.env.JWT_SECRET,
					expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME ?? '7d',
				}
			),
		]);

		const tokens: SessionDto = {
			accessToken,
			refreshToken,
		};

		return tokens;
	}

	async sendEmailConfirmationEmail(
		ulrToImportCssInEmail: string,
		ulrToImportImagesInEmail: string,
		user: User
	) {
		this._logger.debug('sendEmailConfirmationEmail()');
		const tokens: SessionDto = await this.getTokens(user.id, user.email);

		await this._mailerService.sendEmailConfirmationEmail(
			ulrToImportCssInEmail,
			ulrToImportImagesInEmail,
			user.email,
			tokens.accessToken
		);
	}

	async confirmEmail(
		ulrToImportCssInEmail: string,
		ulrToImportImagesInEmail: string,
		user: User
	) {
		this._logger.debug('confirmEmail()');
		// Reviso si el usuario ya tenia el correo confirmado
		if (user.isEmailConfirmed) {
			this._logger.debug('Error: Email already confirmed');
			throw new BadRequestException('Error: Email already confirmed');
		}

		const updateUserDto: UpdateUserDto = new UpdateUserDto();
		updateUserDto.id = user.id;
		updateUserDto.isEmailConfirmed = true;

		await this._userService.update(updateUserDto);

		await this._mailerService.sendEmailConfirmedEmail(
			ulrToImportCssInEmail,
			ulrToImportImagesInEmail,
			user.email
		);
	}
}
