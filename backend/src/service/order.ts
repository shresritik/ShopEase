import { Decimal } from "@prisma/client/runtime/library";
import { BadRequest, NotFound } from "../error";
import { IOrder } from "../interface/order";
import * as OrderModel from "../model/order";
import * as ProductModel from "../model/product";
import { createSignature } from "./auth";
import { getAProductById } from "./product";
import { IQuery } from "../interface/utils";
import { getDiscountByCode } from "./discount";
import { generateFormForPayment } from "../utils/paymentForm";
export const createOrderProduct = async ({
  userId,
  totalAmount,
  location,
  products,
  discount,
}: IOrder) => {
  let prodArr: any = [];
  prodArr = await Promise.all(
    products.map(async (pro) => {
      const val = await getAProductById(pro.id);
      return { ...pro, cost_price: val?.cost_price };
    })
  );
  let discountInfo;
  if (discount) {
    discountInfo = await getDiscountByCode(discount);
  }
  console.log(discountInfo);
  const order = await OrderModel.createOrder(
    userId,
    totalAmount,
    location,
    prodArr,
    discountInfo?.id
  );

  const formData = generateFormForPayment(order);
  return { ...order, formData };
};
export const getOrders = async (query: IQuery) => {
  return await OrderModel.getAllOrders(query);
};
export const updateOrder = async (id: string, data: { status: string }) => {
  return await OrderModel.updateOrderById(id, data);
};
export const getUserOrders = async (userId: number, query: IQuery) => {
  return await OrderModel.getOrderByUser(userId, query);
};
export const deleteOrder = async (id: string) => {
  return await OrderModel.deleteOrder(id);
};

export const getAOrder = async (orderId: string) => {
  const order = await OrderModel.getOrderById(orderId);
  if (!order) throw new NotFound("No Order Found by id " + orderId);
  return order;
};
type Product = {
  id: number;
  product_name: string;
  description: string | null;
  pic: string | null;
  cost_price: Decimal;
  stock: number;
  selling_price: Decimal;
  category_id: number;
  createdAt: Date;
  updatedAt: Date;
};

type OrderProduct = {
  product_id: number;
  quantity: number;
  product: Product | null;
};

type Order = {
  Order_Product: OrderProduct[];
};

type UpdateResult = {
  updatedOrder: Product;
  status: "COMPLETE";
};
export const updateProductFromPayment = async (
  orderId: string
): Promise<UpdateResult[]> => {
  try {
    // Ensure the returned order has the expected structure
    const order: Order = await getAOrder(orderId);

    // Check if order and its products exist
    if (!order || !order.Order_Product) {
      throw new BadRequest(`Order not found or has no products: ${orderId}`);
    }

    // Create an array of promises to update each product's stock
    const updatePromises = order.Order_Product.map(
      async (orderProduct: OrderProduct): Promise<UpdateResult> => {
        if (!orderProduct.product) {
          throw new BadRequest(
            `Product not found for order product ${orderProduct.product_id}`
          );
        }

        const newStock = orderProduct.product.stock - orderProduct.quantity;

        if (newStock < 0) {
          throw new BadRequest(
            `Insufficient stock for product ${orderProduct.product_id}`
          );
        }

        const updatedOrder = await ProductModel.updateProductStockFromOrder(
          orderProduct.product_id,
          newStock
        );

        if (!updatedOrder) {
          throw new BadRequest(
            `Failed to update stock for product ${orderProduct.product_id}`
          );
        }

        return { updatedOrder, status: "COMPLETE" };
      }
    );

    // Wait for all updates to complete
    const results = await Promise.all(updatePromises);
    return results;
  } catch (error) {
    // Log the error for debugging
    console.error("Error in updateProductFromPayment:", error);

    // Rethrow the error or handle it as needed
    if (error instanceof BadRequest || error instanceof NotFound) {
      throw error;
    } else {
      throw new BadRequest(
        "An unexpected error occurred while updating product stock"
      );
    }
  }
};
