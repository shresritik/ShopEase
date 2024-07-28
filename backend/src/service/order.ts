import { IOrder } from "../interface/order";
import * as OrderModel from "../model/order";
export const createOrderProduct = async ({
  userId,
  totalAmount,
  location,
  products,
}: IOrder) => {
  return await OrderModel.createOrder(userId, totalAmount, location, products);
};
export const getOrders = async () => {
  return await OrderModel.getAllOrders();
};
export const getUserOrders = async (userId: number) => {
  return await OrderModel.getOrderByUser(userId);
};
export const deleteOrder = async (id: number) => {
  return await OrderModel.deleteOrder(id);
};
