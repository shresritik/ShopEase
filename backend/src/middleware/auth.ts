import { NextFunction, Response } from "express";
import { IRequest } from "../interface/utils";
import { UnauthorizedError } from "../error";
import { verify } from "jsonwebtoken";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "../interface/users";
import { PERMISSION } from "../enum";
const logger = loggerWithNameSpace("Authentication");
export function authenticate(req: IRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError("No token found"));
    return;
  }
  const token = authorization?.split(" ");
  if (token?.length != 2 || token[0] != "Bearer") {
    next(new UnauthorizedError("No token found"));
    return;
  }
  try {
    const user = verify(token[1], config.secret!) as IUser;
    logger.info("authenticate " + user.name);
    req.user = user;
  } catch (error) {
    logger.error("Token failed");
    next(new UnauthorizedError("Token Failed"));
  }
  next();
}
export function authorize(permission: PERMISSION) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const permit = user?.permissions.includes(permission);
      if (!permit) next(new UnauthorizedError("Unauthorized"));
      logger.info("Authorize " + permit);
    } catch (error) {
      logger.error("Authorization failed");

      next(new UnauthorizedError("Unauthorized"));
    }
  };
}
