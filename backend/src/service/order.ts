import { Decimal } from "@prisma/client/runtime/library";
import { BadRequest, NotFound } from "../error";
import { IOrder } from "../interface/order";
import * as OrderModel from "../model/order";
import * as ProductModel from "../model/product";
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
  console.log(products);
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
  const order = await OrderModel.getAllOrders(query);

  return order;
};
export const getAOrder = async (orderId: string) => {
  const order = await OrderModel.getOrderById(orderId);
  if (!order) throw new NotFound("No Order Found by id " + orderId);
  return order;
};
export const updateOrder = async (id: string, data: { status: string }) => {
  const order = await getAOrder(id);
  if (!order) {
    throw new NotFound("No orders found by id " + id);
  }
  return await OrderModel.updateOrderById(id, data);
};
export const getUserOrders = async (userId: number, query: IQuery) => {
  return await OrderModel.getOrderByUser(userId, query);
};
export const deleteOrder = async (id: string) => {
  const order = await OrderModel.getOrderById(id);
  if (!order) throw new NotFound("No Order Found by id " + id);
  return await OrderModel.deleteOrder(id);
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
    const order: Order = await getAOrder(orderId);
    if (!order || !order.Order_Product) {
      throw new BadRequest(`Order not found or has no products: ${orderId}`);
    }
    const updatePromises = order.Order_Product.map(
      async (orderProduct: OrderProduct): Promise<UpdateResult> => {
        if (!orderProduct.product) {
          throw new BadRequest(
            `Product not found for order product ${orderProduct.product_id}`
          );
        }
        console.log("---------", orderProduct);
        const newStock = orderProduct.product.stock - orderProduct.quantity;
        console.log(
          "newStock--------",
          orderProduct.product.stock,
          orderProduct.quantity
        );
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

    const results = await Promise.all(updatePromises);
    return results;
  } catch (error) {
    console.error("Error in updateProductFromPayment:", error);
    if (error instanceof BadRequest || error instanceof NotFound) {
      throw error;
    } else {
      throw new BadRequest(
        "An unexpected error occurred while updating product stock"
      );
    }
  }
};
