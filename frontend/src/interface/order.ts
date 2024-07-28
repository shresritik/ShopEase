import { IProduct } from "./product";

export interface OrderProduct {
  product: {
    product_name: string;
    pic: string | null;
  };
  category: {
    category_name: string;
  };
  net_amount: number;
  quantity: number;
}

export interface Order {
  id: number;
  createdAt: Date;
  total_amount: number;
  Order_Product: OrderProduct[];
}
export interface IOrderView extends IProduct {
  name: string;
  quantity: number;
  totalAmount: number;
  subtotal: number;
  createdAt: Date;
}
