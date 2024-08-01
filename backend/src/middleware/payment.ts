import { NextFunction, Response } from "express";
import { IRequest } from "../interface/payment";
import { paymentResponse } from "../service/payment";
import { NotFound } from "../error";

export const handleEsewaSuccess = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = req.body;
    console.log(req.body);
    if (!data) {
      throw new NotFound("Transaction payment not found");
    }
    const decodedData = await paymentResponse(data);
    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    next();
  } catch (error) {
    next(error);
  }
};
