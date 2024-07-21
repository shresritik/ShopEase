import { NextFunction, Response } from "express";
import HttpStatusCode from "http-status-codes";
import { BadRequest, NotFound, UnauthorizedError } from "../error";
import loggerWithNameSpace from "../utils/logger";
import { IRequest } from "../interface/utils";
const logger = loggerWithNameSpace("ErrorHandler");
export function notFound(req: IRequest, res: Response) {
  return res
    .status(HttpStatusCode.NOT_FOUND)
    .json({ error: "Route not found" });
}
//generic error handler to send the status codes and error message for particular errors
export function genericErrorHandler(
  error: Error,
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  if (error.stack) {
    logger.error(error.stack);
  }
  if (error instanceof UnauthorizedError) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ error: error.message });
  }

  if (error instanceof BadRequest) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ error: error.message });
  }
  if (error instanceof NotFound) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ error: error.message });
  }
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}
