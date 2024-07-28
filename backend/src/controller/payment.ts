import { NextFunction, Response } from "express";
import { IRequest } from "../interface/payment";
import { updateProductFromPayment } from "../service/order";
import HttpStatusCode from "http-status-codes";

export async function updateProductAfterPayment(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = req.transaction_uuid;
    const order = await updateProductFromPayment(orderId!);
    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    next(error);
  }
}
