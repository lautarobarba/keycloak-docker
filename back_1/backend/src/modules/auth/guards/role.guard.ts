import { Role } from "../role.enum";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  mixin,
  Type,
} from "@nestjs/common";
import { RequestWithUser } from "../request-with-user.interface";
import { JwtAuthenticationGuard } from "modules/auth/guards/jwt-authentication.guard";
import { User } from "modules/user/user.entity";
// import { IJWTPayload } from "modules/auth/jwt-payload.interface";
import { UserService } from "modules/user/user.service";

export const RoleGuard = (roles: Role[]): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin extends JwtAuthenticationGuard {
    constructor(private readonly _userService: UserService) {
      super();
    }
    private readonly _logger = new Logger(RoleGuardMixin.name);

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

      if (!roles.includes(user.role)) {
        this._logger.debug(
          `El usuario ${user.email} NO PUEDE INGRESAR. Role: ${user.role}`
        );
      }

      return roles.includes(user.role);
    }
  }

  return mixin(RoleGuardMixin);
};
