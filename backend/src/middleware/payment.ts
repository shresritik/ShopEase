import { NextFunction, Response } from "express";
import { createSignature } from "../service/auth";
import { IRequest } from "../interface/payment";
import { paymentResponse } from "../service/payment";

export const handleEsewaSuccess = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = req.body;
    console.log(req.body);
    const decodedData = await paymentResponse(data);
    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    next();
  } catch (error) {
    next(error);
  }
};
