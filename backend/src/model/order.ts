import { IOrderProduct } from "../interface/order";
import { IQuery } from "../interface/utils";
import prisma from "../utils/prisma";

//craete order and calcuate profit based on the selling and cost price and quantity
export const createOrder = async (
  userId: number,
  totalAmount: number,
  address: string,
  vat: number,
  products: IOrderProduct[],
  discountId?: number
) => {
  const totalProfit = products.reduce((acc, product) => {
    const productProfit =
      product.quantity * (product.sellingPrice - product.costPrice);
    return acc + productProfit;
  }, 0);
  return await prisma.order.create({
    data: {
      userId: userId,
      totalAmount: totalAmount,
      location: address,
      profit: totalProfit,
      discountId,
      vat,
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
  return await prisma.order.delete({
    where: {
      id: id,
    },
  });
};
// get orders which are createdAt greater than the query
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
// get orders in descending order
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
export const updateOrderById = async (
  orderId: string,
  data: { status: string }
) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status: data.status },
  });
};
