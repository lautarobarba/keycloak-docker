import { Request } from 'express';
import { IJWTPayload } from './jwt-payload.interface';

export interface RequestWithUser extends Request {
  user: IJWTPayload;
}
