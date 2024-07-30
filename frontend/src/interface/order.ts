import { IProduct } from "./product";

export interface OrderProduct {
  product: {
    product_name: string;
    cost_price: number;
    pic: string | null;
  };
  category: {
    category_name: string;
  };
  net_amount: number;
  quantity: number;
  profit?: number;
}

export interface Order {
  id: number;
  createdAt: Date;
  total_amount: number;
  Order_Product: OrderProduct[];
  user?: { name: string };
}
export interface IOrderView extends IProduct {
  name: string;
  quantity: number;
  totalAmount: number;
  subtotal: number;
  createdAt: Date;
  user?: string;
  profit?: number;
}
