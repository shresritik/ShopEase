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
    let orderId = req.transaction_uuid;
    orderId = orderId!.split("$")[0];
    let order = await updateProductFromPayment(orderId!);
    console.log(orderId);
    if (!order) throw new NotFound("Order not found");
    if (!orderId) throw new NotFound("Order not found");
    const updatedStatus = await updateOrderById(orderId, {
      status: "complete",
    });
    res.status(HttpStatusCode.OK).json(updatedStatus);
  } catch (error) {
    next(error);
  }
}
