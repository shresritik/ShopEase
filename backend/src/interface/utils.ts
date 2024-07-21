import { IUser } from "./users";
import { Request } from "express";
export interface IRequest extends Request {
  user?: IUser;
}
