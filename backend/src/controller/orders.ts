import { NextFunction, Request, Response } from "express";
import {
  createOrderProduct,
  deleteOrder,
  getAOrder,
  getOrders,
  getUserOrders,
} from "../service/order";
import HttpStatusCode from "http-status-codes";
import { generateFormForPayment } from "../utils/paymentForm";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, totalAmount, location, vat, products, discount } = req.body;
    const orderDetails = {
      userId,
      totalAmount,
      location,
      vat,
      products,
      discount,
    };
    const order = await createOrderProduct(orderDetails);
    res.status(HttpStatusCode.CREATED).json(order);
  } catch (error) {
    next(error);
  }
}
export async function getAllOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await getOrders(req.query);
    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    next(error);
  }
}
export async function getOrdersByUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const order = await getUserOrders(+id, req.query);
    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    next(error);
  }
}
export async function deleteOrderById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const order = await deleteOrder(id);
    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    next(error);
  }
}
export async function getOrderById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const order = await getAOrder(id);
    res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    next(error);
  }
}
export async function generatePaymentForm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = req.body;
    const form = generateFormForPayment(order);
    res.status(HttpStatusCode.OK).json(form);
  } catch (error) {
    next(error);
  }
}
