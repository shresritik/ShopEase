import { IOrder_Product } from "../interface/order";
import prisma from "../utils/prisma";

// Define an interface for the product in the order
export interface IOrderProduct {
  id: number;
  quantity: number;
  selling_price: number;
  category_id: number;
}

export const createOrder = async (
  userId: number,
  totalAmount: number,
  address: string,
  products: IOrderProduct[]
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
          category_id: product.category_id,
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
      id: "" + id,
    },
  });
};
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
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
export const getOrderByUser = async (userId: number) => {
  return await prisma.order.findMany({
    where: {
      user_id: userId,
    },

    include: {
      Order_Product: {
        include: {
          category: true,
          product: true,
        },
      },
    },
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
