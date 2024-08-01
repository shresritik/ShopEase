import { IOrderProduct } from "../interface/order";
import { IQuery } from "../interface/utils";
import prisma from "../utils/prisma";

// Define an interface for the product in the order

export const createOrder = async (
  userId: number,
  totalAmount: number,
  address: string,
  products: IOrderProduct[],
  discountId?: number
) => {
  const totalProfit = products.reduce((acc, product) => {
    const productProfit =
      product.quantity * (product.sellingPrice - product.costPrice);
    return acc + productProfit;
  }, 0);
  console.log(totalProfit);
  return await prisma.order.create({
    data: {
      userId: userId,
      totalAmount: totalAmount,
      location: address,
      profit: totalProfit,
      discountId,
      OrderProduct: {
        create: products.map((product: IOrderProduct) => ({
          productId: product.id,
          quantity: product.quantity,
          netAmount: product.quantity * product.sellingPrice,
          categoryId: product.categoryId,
        })),
      },
    },
    include: {
      OrderProduct: true,
      discount: true,
    },
  });
};
export const deleteOrder = async (id: string) => {
  console.log(id);
  return await prisma.order.delete({
    where: {
      id: id,
    },
  });
};
export const getAllOrders = async (query: IQuery) => {
  return await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: query.q
      ? {
          createdAt: { gte: query.q },
        }
      : {},
    include: {
      discount: true,
      user: {
        select: {
          name: true,
        },
      },
      OrderProduct: {
        include: {
          category: true,
          product: true,
        },
      },
    },
  });
};
export const getOrderByUser = async (userId: number, query: IQuery) => {
  return await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },

    where: query.q
      ? {
          createdAt: { gte: query.q },
          userId: userId,
        }
      : {
          userId: userId,
        },
    include: {
      discount: true,
      OrderProduct: {
        include: {
          category: true,
          product: true,
        },
      },
    },
  });
};
export const getOrderById = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      discount: true,

      OrderProduct: {
        include: {
          product: true,
        },
      },
    },
  });
};
export const updateOrderById = async (
  orderId: string,
  data: { status: string }
) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      status: data.status,
    },
  });
};
