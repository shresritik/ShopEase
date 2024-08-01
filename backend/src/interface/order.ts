import { Product } from "@prisma/client";

export interface IOrderProduct {
  id: number;
  quantity: number;
  sellingPrice: number;
  costPrice: number;
  categoryId: number;
}
export interface IOrder {
  userId: number;
  totalAmount: number;
  location: string;
  products: IOrderProduct[];
  discount?: string;
  vat: number;
}
export interface OrderProduct {
  productId: number;
  quantity: number;
  product: Product | null;
}
export interface UpdateResult {
  updatedOrder: Product;
  status: "COMPLETE";
}
