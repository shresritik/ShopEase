import { IProduct } from "./product";

export interface IOrder_Product {
  id: number;
  quantity: number;
  selling_price: number;
  category_id: number;
}
export interface IOrder {
  userId: number;
  totalAmount: number;
  location: string;
  products: IProduct[];
}
