import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import {
  createDiscount,
  deleteDiscount,
  getAllDiscount,
  getDiscountByCode,
  updateDiscount,
} from "../service/discount";
export const createADiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const discount = await createDiscount(body);
    res.status(HttpStatusCode.CREATED).json(discount);
  } catch (error) {
    next(error);
  }
};
export const getDiscounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const discount = await getAllDiscount();
    res.status(HttpStatusCode.OK).json(discount);
  } catch (error) {
    next(error);
  }
};
export const getADiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const discount = await getDiscountByCode(id);
    res.status(HttpStatusCode.OK).json(discount);
  } catch (error) {
    next(error);
  }
};
export const updateADiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const discount = await updateDiscount(+id, req.body);
    res.status(HttpStatusCode.OK).json(discount);
  } catch (error) {
    next(error);
  }
};
export const deleteADiscount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const discount = await deleteDiscount(+id);
    res.status(HttpStatusCode.OK).json(discount);
  } catch (error) {
    next(error);
  }
};
