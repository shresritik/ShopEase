import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { BadRequest } from "../error";
//validate request body
export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) next(new BadRequest(error.message));
    req.body = value;
    next();
  };
}
//validate request query
export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);
    if (error) next(new BadRequest(error.message));
    req.query = value;
    next();
  };
}

//validate request param
export function validateReqId(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);
    if (error) next(new BadRequest(error.message));
    req.params = value;
    next();
  };
}
