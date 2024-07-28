import { IOrder } from "../interface/order";
import * as OrderModel from "../model/order";
import { createSignature } from "./auth";
export const createOrderProduct = async ({
  userId,
  totalAmount,
  location,
  products,
}: IOrder) => {
  const order = await OrderModel.createOrder(
    userId,
    totalAmount,
    location,
    products
  );
  const signature = createSignature(
    `total_amount=${order.total_amount},transaction_uuid=${order.id},product_code=EPAYTEST`
  );
  const formData = {
    amount: order.total_amount,
    failure_url: "http://localhost:5173/success",
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature: signature,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:5173/success",
    tax_amount: "0",
    total_amount: order.total_amount,
    transaction_uuid: order.id,
  };
  return { ...order, formData };
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
