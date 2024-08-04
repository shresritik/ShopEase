import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../service/categories";
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getCategories();
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const createCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await createCategory(req.body);
    res.status(HttpStatusCode.CREATED).json(products);
  } catch (error) {
    next(error);
  }
};
export const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const products = await deleteCategory(+id);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const updateCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const products = await updateCategory(+id, req.body);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
