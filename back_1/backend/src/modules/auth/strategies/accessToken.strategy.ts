import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from 'modules/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJWTPayload } from '../jwt-payload.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private readonly _userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: IJWTPayload) {
		const { email } = payload;

		const user = await this._userService.findOneByEmail(email);

		if (!user) {
			throw new UnauthorizedException('Error: Unauthorized');
		}

		return payload;
	}
}
