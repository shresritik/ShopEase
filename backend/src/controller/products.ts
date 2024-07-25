import { NextFunction, query, Request, Response } from "express";
import {
  createAProduct,
  deleteAProducts,
  getAProduct,
  getAProductByCategoryAndId,
  getCategories,
  getProductCategory,
  getProducts,
  updateAProduct,
} from "../service/product";
import HttpStatusCode from "http-status-codes";
import { IRequest } from "../interface/utils";
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { query } = req;
    const products = await getProducts(query);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
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
export const getProductByCategoryAndId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, id } = req.params;
    const { query } = req;
    const products = await getAProductByCategoryAndId(category, +id, query);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const products = await deleteAProducts(+id);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, user, file } = req;
    const products = await createAProduct(user?.id!, {
      ...body,
      pic: file?.filename,
    });
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body, user } = req;
    const { id } = req.params;
    console.log("asd", id);
    const products = await updateAProduct(+id, user?.id!, body);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const getProductsByCategory = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;
    const { query } = req;
    const products = await getProductCategory(category, query);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
export const getProductByName = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const products = await getAProduct(body.product_name);
    res.status(HttpStatusCode.OK).json(products);
  } catch (error) {
    next(error);
  }
};
