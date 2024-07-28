import { Decimal } from "@prisma/client/runtime/library";
import { BadRequest, NotFound } from "../error";
import { IOrder } from "../interface/order";
import * as OrderModel from "../model/order";
import * as ProductModel from "../model/product";
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

export const getAProduct = async (orderId: string) => {
  const order = await OrderModel.getProductById(orderId);
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
    const order: Order = await getAProduct(orderId);

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
