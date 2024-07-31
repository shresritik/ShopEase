import { Discount } from "@prisma/client";
import * as DiscountModel from "../model/discount";
export const createDiscount = async (discount: Discount) => {
  return await DiscountModel.createDiscount(discount);
};
export const getAllDiscount = async () => {
  return await DiscountModel.getAllDiscount();
};
export const getDiscountByCode = async (code: string) => {
  return await DiscountModel.getDiscountByCode(code);
};
export const deleteDiscount = async (id: number) => {
  return await DiscountModel.deleteDiscount(id);
};
export const updateDiscount = async (id: number, discount: Discount) => {
  return await DiscountModel.updateDiscount(id, discount);
};
