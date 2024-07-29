import { NextFunction, Request, Response } from "express";
import { createProductReview, getAllReview } from "../service/reviews";
import HttpStatusCode from "http-status-codes";
export const createAReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const review = await createProductReview(body);
    res.status(HttpStatusCode.CREATED).json(review);
  } catch (error) {
    next(error);
  }
};
export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const review = await getAllReview(+id);
    res.status(HttpStatusCode.OK).json(review);
  } catch (error) {
    next(error);
  }
};
