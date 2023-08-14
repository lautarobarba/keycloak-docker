import { Request } from "express";
import { User } from "modules/user/user.entity";

export interface RequestWithUser extends Request {
  user: User;
}
