import { IUser } from "./users";
import { Request } from "express";
export interface IRequest extends Request {
  user?: IUser;
}
export interface IQuery {
  q?: string;
  page?: number;
  size?: number;
}
