import { IDiscount } from "./discount";
import { IProduct } from "./product";

export interface OrderProduct {
  id?: number;
  product: {
    productName: string;
    costPrice: number;
    pic: string | null;
  };
  products?: {
    productName: string;
    costPrice: number;
    pic: string | null;
  };
  category: {
    categoryName: string;
  };
  net_amount: number;
  quantity: number;
  profit?: number;
}

export interface Order {
  id?: number;
  createdAt?: Date;
  totalAmount?: number;
  profit?: number;
  status?: string;
  discount?: IDiscount;
  OrderProduct: OrderProduct[];
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
