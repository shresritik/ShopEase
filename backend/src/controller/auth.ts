import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import * as AuthService from "../service/auth";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("Authentication");
//login a user to generate the tokens
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const data = await AuthService.login(body);
    logger.info("login success");
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
