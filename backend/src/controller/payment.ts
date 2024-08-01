import { NextFunction, Response } from "express";
import { IRequest } from "../interface/payment";
import { updateProductFromPayment } from "../service/order";
import HttpStatusCode from "http-status-codes";
import { NotFound } from "../error";
import { updateOrderById } from "../model/order";

export async function updateProductAfterPayment(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = req.transaction_uuid;
    const order = await updateProductFromPayment(orderId!);
    if (!order) throw new NotFound("Order not found");
    if (!orderId) throw new NotFound("Order not found");
    const updatedStatus = await updateOrderById(orderId, {
      status: "complete",
    });
    console.log("statue", updatedStatus);
    res.status(HttpStatusCode.OK).json(updatedStatus);
  } catch (error) {
    next(error);
  }
}
