import { BadRequest, NotFound } from "../error";
import { IOrder, OrderProduct, UpdateResult } from "../interface/order";
import * as OrderModel from "../model/order";
import * as ProductModel from "../model/product";
import { getAProductById } from "./product";
import { IQuery } from "../interface/utils";
import { getDiscountByCode } from "./discount";
import { generateFormForPayment } from "../utils/paymentForm";
// create order and check for discount by that user
export const createOrderProduct = async ({
  userId,
  totalAmount,
  location,
  vat,
  products,
  discount,
}: IOrder) => {
  let prodArr: any = [];
  prodArr = await Promise.all(
    products.map(async (pro) => {
      const val = await getAProductById(pro.id);
      return { ...pro, costPrice: val?.costPrice };
    })
  );
  let discountInfo;
  if (discount) {
    discountInfo = await getDiscountByCode(discount);
    discountInfo.order.forEach((order) => {
      if (userId == order.userId) {
        throw new BadRequest("User already used this coupon");
      }
    });
  }
  const order = await OrderModel.createOrder(
    userId,
    totalAmount,
    location,
    vat,
    prodArr,
    discountInfo?.id
  );
  // generate signature for esewa
  const formData = generateFormForPayment(order);
  return { ...order, formData };
};
// get All Orders
export const getOrders = async (query: IQuery) => {
  const order = await OrderModel.getAllOrders(query);

  return order;
};
// get A Order by id
export const getAOrder = async (orderId: string) => {
  const order = await OrderModel.getOrderById(orderId);

  if (!order) throw new NotFound("No Order Found by id " + orderId);
  return order;
};
// update order by id and also save its status
export const updateOrder = async (id: string, data: { status: string }) => {
  const order = await getAOrder(id);
  if (!order) {
    throw new NotFound("No orders found by id " + id);
  }
  return await OrderModel.updateOrderById(id, data);
};
//get Orders by User
export const getUserOrders = async (userId: number, query: IQuery) => {
  return await OrderModel.getOrderByUser(userId, query);
};
// delete orders by id
export const deleteOrder = async (id: string) => {
  const order = await OrderModel.getOrderById(id);
  if (!order) throw new NotFound("No Order Found by id " + id);
  return await OrderModel.deleteOrder(id);
};
// update the product after payment of the order
export const updateProductFromPayment = async (
  orderId: string
): Promise<UpdateResult[]> => {
  try {
    const order = await getAOrder(orderId);
    if (!order || !order.OrderProduct) {
      throw new BadRequest(`Order not found or has no products: ${orderId}`);
    }

    const updatePromises = order.OrderProduct.map(
      async (orderProduct: OrderProduct): Promise<UpdateResult> => {
        if (!orderProduct.product) {
          throw new BadRequest(
            `Product not found for order product ${orderProduct.productId}`
          );
        }
        // check for stock
        const newStock = orderProduct.product.stock - orderProduct.quantity;
        if (newStock < 0) {
          throw new BadRequest(
            `Insufficient stock for product ${orderProduct.productId}`
          );
        }
        // update product
        const updatedOrder = await ProductModel.updateProductStockFromOrder(
          orderProduct.productId,
          newStock
        );

        if (!updatedOrder) {
          throw new BadRequest(
            `Failed to update stock for product ${orderProduct.productId}`
          );
        }

        return { updatedOrder, status: "COMPLETE" };
      }
    );

    const results = await Promise.all(updatePromises);
    return results;
  } catch (error) {
    if (error instanceof BadRequest || error instanceof NotFound) {
      throw error;
    } else {
      throw new BadRequest(
        "An unexpected error occurred while updating product stock"
      );
    }
  }
};
