import { RequestWithUser } from "modules/auth/request-with-user.interface";
import { User } from "modules/user/user.entity";

export const getUserIdFromRequest = (request: RequestWithUser): number => {
  const user: User = request.user as User;
  return user.id;
};
