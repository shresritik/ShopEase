import { Request } from "express";

export interface IRequest extends Request {
  transaction_uuid?: string;
  transaction_code?: string;
}
