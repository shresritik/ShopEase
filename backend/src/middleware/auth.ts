import { NextFunction, Response } from "express";
import { IRequest } from "../interface/utils";
import { UnauthorizedError } from "../error";
import { verify } from "jsonwebtoken";
import config from "../config";
import loggerWithNameSpace from "../utils/logger";
import { IUser } from "../interface/users";
import { PERMISSION } from "@prisma/client";
const logger = loggerWithNameSpace("Authentication");
export function authenticate(options: boolean = false) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    //no need authenticate for users to create their own account
    if (req.body.roleId == 3 && options) {
      next();
      return;
    }
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
      console.log("User", user);
      req.user = user;
    } catch (error) {
      logger.error("Token failed");
      next(new UnauthorizedError("Token Failed"));
    }
    next();
  };
}
export function authorize(permission: PERMISSION[], options: Boolean = false) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const existingUser = req.user;
      //no need authorization for users to create their own account
      if (req.body.roleId == 3 && options) {
        return next();
      }
      //don't let existing users to create others account
      if (existingUser?.roleId == 3 && options)
        throw new UnauthorizedError("Unauthorized");
      //setting hierarchial permissions(users should not crud above permissions same for admin)
      if (existingUser?.roleId! > req.body.roleId)
        throw new UnauthorizedError("Unauthorized");
      // if (user?.roleId == 3 && options) next();
      const permit = permission.findIndex((p) => {
        return user?.permissions!.includes(p);
      });
      if (permit == -1) {
        next(new UnauthorizedError("Unauthorized"));
      }
      logger.info("Authorize " + permit);
      next();
    } catch (error) {
      logger.error("Authorization failed");

      next(new UnauthorizedError("Unauthorized"));
    }
  };
}
