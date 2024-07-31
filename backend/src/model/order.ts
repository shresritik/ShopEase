import { IOrder_Product } from "../interface/order";
import { IQuery } from "../interface/utils";
import prisma from "../utils/prisma";

// Define an interface for the product in the order

export const createOrder = async (
  userId: number,
  totalAmount: number,
  address: string,
  products: IOrder_Product[],
  discountId?: number
) => {
  const totalProfit = products.reduce((acc, product) => {
    const productProfit =
      product.quantity * (product.selling_price - product.cost_price);
    return acc + productProfit;
  }, 0);
  console.log(totalProfit);
  return await prisma.order.create({
    data: {
      user_id: userId,
      total_amount: totalAmount,
      location: address,
      profit: totalProfit,
      discountId,
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
      Order_Product: {
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
          user_id: userId,
        }
      : {
          user_id: userId,
        },
    include: {
      discount: true,
      Order_Product: {
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

      Order_Product: {
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
