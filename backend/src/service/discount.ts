import { Discount } from "@prisma/client";
import * as DiscountModel from "../model/discount";
import { NotFound } from "../error";
export const createDiscount = async (discount: Discount) => {
  const dis = await DiscountModel.createDiscount(discount);
  if (!dis) {
    throw new NotFound("Cannot create discount coupon");
  }
  return dis;
};
export const getAllDiscount = async () => {
  const dis = await DiscountModel.getAllDiscount();
  if (!dis || dis.length == 0) {
    throw new NotFound("No discount found");
  }
  return dis;
};
export const getDiscountByCode = async (code: string) => {
  const dis = await DiscountModel.getDiscountByCode(code);
  if (!dis) {
    throw new NotFound("No discount found by coupon " + code);
  }
  return dis;
};
export const getDiscountById = async (id: number) => {
  const dis = await DiscountModel.getDiscountById(id);
  if (!dis) {
    throw new NotFound("No discount found by coupon" + id);
  }
  return dis;
};
export const deleteDiscount = async (id: number) => {
  const dis = await getDiscountById(id);
  if (!dis) {
    throw new NotFound("No discount found with id " + id);
  }
  await DiscountModel.deleteDiscount(id);
};
export const updateDiscount = async (id: number, discount: Discount) => {
  const dis = await getDiscountById(id);
  if (!dis) {
    throw new NotFound("No discount found with id " + id);
  }
  return await DiscountModel.updateDiscount(id, discount);
};
