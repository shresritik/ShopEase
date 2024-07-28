import { IOrder_Product } from "../interface/order";
import prisma from "../utils/prisma";

export const createOrder = async (
  userId: number,
  totalAmount: number,
  address: string,
  products: any
) => {
  return await prisma.order.create({
    data: {
      user_id: userId,
      total_amount: totalAmount,
      location: address,
      Order_Product: {
        create: products.map((product: IOrder_Product) => ({
          product_id: product.id,
          quantity: product.quantity,
          net_amount: product.quantity * product.selling_price,
        })),
      },
    },
    include: {
      Order_Product: true,
    },
  });
};
export const deleteOrder = async (id: number) => {
  return await prisma.order.delete({
    where: {
      id,
    },
  });
};
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { Order_Product: true },
  });
};
export const getOrderByUser = async (userId: number) => {
  return await prisma.order.findMany({
    where: {
      user_id: userId,
    },
    include: { Order_Product: true },
  });
};
