import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  mixin,
  Type,
} from "@nestjs/common";
import { RequestWithUser } from "modules/auth/request-with-user.interface";
import { JwtAuthenticationGuard } from "modules/auth/guards/jwt-authentication.guard";
import { User } from "modules/user/user.entity";
// import { IJWTPayload } from "modules/auth/jwt-payload.interface";
import { UserService } from "modules/user/user.service";

export const IsEmailConfirmedGuard = (): Type<CanActivate> => {
  @Injectable()
  class IsEmailConfirmedGuardMixin extends JwtAuthenticationGuard {
    constructor(private readonly _userService: UserService) {
      super();
    }
    private readonly _logger = new Logger(IsEmailConfirmedGuardMixin.name);

    async canActivate(context: ExecutionContext) {
      // Check if the user is authenticated with JwtAuthenticationGuard
      await super.canActivate(context);

      const request: RequestWithUser = context
        .switchToHttp()
        .getRequest<RequestWithUser>();
      const payload: User = request.user;
      // console.log(payload);
      const user: User = await this._userService.findOne(payload.id);
      // console.log(user);

      if (!user.isEmailConfirmed) {
        this._logger.debug(
          `El usuario ${user.email} no confirmó su correo electrónico. NO PUEDE INGRESAR. Role: ${user.role}`
        );
      }

      return user.isEmailConfirmed;
    }
  }

  return mixin(IsEmailConfirmedGuardMixin);
};
