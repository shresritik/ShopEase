import { Order, Order_Product, Product } from "@prisma/client";
import { IOrder_Product } from "../interface/order";
import prisma from "../utils/prisma";
import { IProduct } from "../interface/product";
import { BadRequest } from "../error";

export const createOrder = async (
  userId: number,
  totalAmount: number,
  address: string,
  products: any
) => {
  // Get the PENDING status
  const pendingStatus = await prisma.status.findFirst({
    where: { status: "PENDING" },
  });
  return await prisma.order.create({
    data: {
      user_id: userId,
      total_amount: totalAmount,
      location: address,
      status: {
        create: {
          status_id: pendingStatus!.id,
        },
      },
      Order_Product: {
        create: products.map((product: IOrder_Product) => ({
          product_id: product.id,
          quantity: product.quantity,
          net_amount: product.quantity * product.selling_price,
          category_id: product.category_id,
        })),
      },
    },
    include: {
      Order_Product: true,
      status: {
        include: {
          status: true,
        },
      },
    },
  });
};
export const deleteOrder = async (id: number) => {
  return await prisma.order.delete({
    where: {
      id: "" + id,
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
export const getProductById = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      Order_Product: {
        include: {
          product: true,
        },
      },
    },
  });
};
export const updateProductStockFromOrder = async (
  product_id: number,
  newStock: number
) => {
  // Update stock for each product in the order

  return await prisma.product.update({
    where: { id: product_id },
    data: { stock: newStock },
  });
};
