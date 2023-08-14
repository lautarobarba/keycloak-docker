import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { User } from "modules/user/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _authService: AuthService) {
    super({
      usernameField: "email",
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return this._authService.getAuthenticatedUser(email, password);
  }
}
