import { Discount } from "@prisma/client";
import prisma from "../utils/prisma";

export const createDiscount = async (discount: Discount) => {
  return await prisma.discount.create({
    data: {
      code: discount.code,
      percentage: discount.percentage,
      validFrom: discount.validFrom,
      validUntil: discount.validUntil,
    },
  });
};
export const getAllDiscount = async () => {
  return await prisma.discount.findMany({
    include: {
      order: true,
      user: true,
    },
  });
};
export const deleteDiscount = async (id: number) => {
  return await prisma.discount.delete({
    where: {
      id,
    },
  });
};
export const getDiscountById = async (id: number) => {
  return await prisma.discount.findFirst({
    where: {
      id,
    },
  });
};
export const getDiscountByCode = async (code: string) => {
  return await prisma.discount.findFirst({
    where: {
      code,
    },
    include: {
      order: true,
      user: true,
    },
  });
};
export const updateDiscount = async (id: number, discount: Discount) => {
  return await prisma.discount.update({
    where: {
      id,
    },
    data: {
      code: discount.code,
      percentage: discount.percentage,
      validFrom: discount.validFrom,
      validUntil: discount.validUntil,
    },
  });
};
