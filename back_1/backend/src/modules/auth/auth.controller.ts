import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  NotFoundException,
  UploadedFile,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { Response, Request, Express } from "express";
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { MENSAJE_ERROR } from "modules/utils/error-message";
import { AuthGuard } from "nest-keycloak-connect";

@ApiTags("Autenticación")
@Controller("auth")
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  private readonly _logger = new Logger(AuthController.name);

  //   @Post("register")
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @UseInterceptors(
  //     LocalFilesInterceptor({
  //       fieldName: "profilePicture",
  //       path: "/temp",
  //       fileFilter: (request, file, callback) => {
  //         if (!file.mimetype.includes("image")) {
  //           return callback(new BadRequestException("Invalid image file"), false);
  //         }
  //         callback(null, true);
  //       },
  //       limits: {
  //         fileSize: 1024 * 1024 * 10, // 10MB
  //       },
  //     })
  //   )
  //   @ApiConsumes("multipart/form-data")
  //   @ApiBody({
  //     description: "Atributos del usuario",
  //     type: CreateUserDto,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.CREATED,
  //     type: SessionDto,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.CONFLICT,
  //     description: MENSAJE_ERROR.CLAVE_PRIMARIA_EN_USO,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_ACCEPTABLE,
  //     description: MENSAJE_ERROR.NO_ACEPTABLE,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.PAYLOAD_TOO_LARGE,
  //     description: MENSAJE_ERROR.ARCHIVO_MUY_PESADO,
  //   })
  //   async register(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response,
  //     @Body() createUserDto: CreateUserDto,
  //     @UploadedFile() profilePicture?: Express.Multer.File
  //   ): Promise<SessionDto> {
  //     this._logger.debug("POST: /api/auth/register");
  //     // Urls que necesito para los correos
  //     const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
  //     const ulrToImportImagesInEmail: string = `${
  //       request.protocol
  //     }://${request.get("Host")}`;

  //     // Agrego la foto de perfil al DTO para enviarlo al service
  //     createUserDto.profilePicture = profilePicture;

  //     response.status(HttpStatus.CREATED);
  //     return this._authService.register(
  //       ulrToImportCssInEmail,
  //       ulrToImportImagesInEmail,
  //       createUserDto
  //     );
  //   }

  //   @Post("login")
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //     type: SessionDto,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: MENSAJE_ERROR.NO_ENCONTRADO,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: MENSAJE_ERROR.CONTRASENA_INCORRECTA,
  //   })
  //   async login(
  //     @Res({ passthrough: true }) response: Response,
  //     @Body() loginDto: LoginDto
  //   ): Promise<SessionDto> {
  //     this._logger.debug("POST: /api/auth/login");
  //     response.status(HttpStatus.OK);
  //     return this._authService.login(loginDto);
  //   }

  //   @Post("logout")
  //   @UseGuards(JwtAuthenticationGuard)
  //   @ApiBearerAuth()
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: MENSAJE_ERROR.NO_ENCONTRADO,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: MENSAJE_ERROR.FALTAN_PERMISOS,
  //   })
  //   async logout(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response
  //   ) {
  //     this._logger.debug("POST: /api/auth/logout");
  //     const session: IJWTPayload = request.user as IJWTPayload;
  //     const user: User = await this._userService.findOne(session.sub);
  //     response.status(HttpStatus.OK);
  //     await this._authService.logout(user.id);
  //   }

  //   @Post("refresh")
  //   @UseGuards(RefreshTokenGuard)
  //   @ApiBearerAuth()
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //     type: SessionDto,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.FORBIDDEN,
  //     description: MENSAJE_ERROR.TOKEN_INCORRECTO,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: MENSAJE_ERROR.NO_ENCONTRADO,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_ACCEPTABLE,
  //     description: MENSAJE_ERROR.NO_ACEPTABLE,
  //   })
  //   async refreshTokens(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response
  //   ): Promise<SessionDto> {
  //     this._logger.debug("POST: /api/auth/refresh");
  //     const { payload, refreshToken } = request.user as {
  //       payload: IJWTPayload;
  //       refreshToken: string;
  //     };
  //     const userId: number = Number(payload.sub);

  //     response.status(HttpStatus.OK);
  //     return this._authService.refreshTokens(userId, refreshToken);
  //   }

  //   @Post("change-password")
  //   @UseGuards(JwtAuthenticationGuard)
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @ApiBearerAuth()
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //     type: SessionDto,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: "Error: Not Found",
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: "Error: Unauthorized/Error: Not allow",
  //   })
  //   async changePassword(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response,
  //     @Body() changePasswordDto: ChangePasswordDto
  //   ): Promise<SessionDto> {
  //     this._logger.debug("POST: /api/auth/change-password");
  //     // Sólo administradores y propietarios pueden actualizar contraseñas
  //     const user: User = await this._userService.getUserFromRequest(request);

  //     if (user.role !== Role.ADMIN && user.id != changePasswordDto.id) {
  //       this._logger.debug("Error: Not allow");
  //       throw new UnauthorizedException("Error: Not allow");
  //     }

  //     response.status(HttpStatus.OK);
  //     return this._authService.changePassword(changePasswordDto);
  //   }

  //   @Post("email-recover-password")
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: "Error: Not Found/Error: Account does not exists",
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: "Error: Unauthorized",
  //   })
  //   async recoverPassword(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response,
  //     @Body() recoverPasswordDto: RecoverPasswordDto
  //   ) {
  //     this._logger.debug("POST: /api/auth/recover-password");
  //     // Urls que necesito para los correos
  //     const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
  //     const ulrToImportImagesInEmail: string = `${
  //       request.protocol
  //     }://${request.get("Host")}`;

  //     response.status(HttpStatus.OK);
  //     return this._authService.recoverPassword(
  //       ulrToImportCssInEmail,
  //       ulrToImportImagesInEmail,
  //       recoverPasswordDto
  //     );
  //   }

  //   @Post("email-confirmation/send")
  //   @UseGuards(JwtAuthenticationGuard)
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @ApiBearerAuth()
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: "Error: Not Found",
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: "Error: Unauthorized",
  //   })
  //   async sendEmailConfirmationEmail(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response
  //   ) {
  //     this._logger.debug("POST: /api/auth/email-confirmation/send");
  //     const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
  //     const ulrToImportImagesInEmail: string = `${
  //       request.protocol
  //     }://${request.get("Host")}`;

  //     const user: User = await this._userService.getUserFromRequest(request);

  //     response.status(HttpStatus.OK);
  //     return this._authService.sendEmailConfirmationEmail(
  //       ulrToImportCssInEmail,
  //       ulrToImportImagesInEmail,
  //       user
  //     );
  //   }

  //   @Post("email-confirmation/confirm")
  //   @UseGuards(JwtAuthenticationGuard)
  //   @UseInterceptors(ClassSerializerInterceptor)
  //   @ApiBearerAuth()
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: "Error: Not Found",
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: "Error: Unauthorized",
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.BAD_REQUEST,
  //     description: "Error: Email already confirmed",
  //   })
  //   async confirmEmail(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response
  //   ) {
  //     this._logger.debug("POST: /api/auth/email-confirmation/confirm");
  //     const ulrToImportCssInEmail: string = `${request.protocol}://host.docker.internal:${process.env.BACK_PORT}`;
  //     const ulrToImportImagesInEmail: string = `${
  //       request.protocol
  //     }://${request.get("Host")}`;

  //     const user: User = await this._userService.getUserFromRequest(request);

  //     response.status(HttpStatus.OK);
  //     return this._authService.confirmEmail(
  //       ulrToImportCssInEmail,
  //       ulrToImportImagesInEmail,
  //       user
  //     );
  //   }

  @Get("test-auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Error: Unauthorized",
  })
  async testPrivateRoute(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ): Promise<string> {
    this._logger.debug("GET: /api/auth/test-auth");

    // return this._authService.testPrivateRoute();
    console.log({ request });

    response.status(HttpStatus.OK);
    return "autenticado...";
  }

  //   @Get("test-email-confirmed")
  //   @UseGuards(IsEmailConfirmedGuard())
  //   @ApiBearerAuth()
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: "Error: Unauthorized",
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.FORBIDDEN,
  //     description: "Error: Forbidden",
  //   })
  //   async testEmailConfirmed(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response
  //   ): Promise<string> {
  //     this._logger.debug("GET: /api/auth/test-email-confirmed");
  //     const user: User = await this._userService.getUserFromRequest(request);
  //     response.status(HttpStatus.OK);
  //     return this._authService.testEmailConfirmed(user.id);
  //   }

  //   @Get("test-role-permission")
  //   @UseGuards(RoleGuard([Role.ADMIN]))
  //   @UseGuards(IsEmailConfirmedGuard())
  //   @ApiBearerAuth()
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.UNAUTHORIZED,
  //     description: "Error: Unauthorized",
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.FORBIDDEN,
  //     description: "Error: Forbidden",
  //   })
  //   async testRolePermission(
  //     @Req() request: Request,
  //     @Res({ passthrough: true }) response: Response
  //   ): Promise<string> {
  //     this._logger.debug("GET: /api/auth/test-role-permission");
  //     const user: User = await this._userService.getUserFromRequest(request);
  //     response.status(HttpStatus.OK);
  //     return this._authService.testRolePermission(user.id);
  //   }
}
