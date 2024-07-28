import { IProduct } from "./product";

export interface CheckoutCard extends IProduct {
  qty: number;
  delivery: number;
  total: number;
  subtotal: number;
}
export interface ICheckoutProduct {
  id: number;
  quantity?: number;
  qty?: number;
  selling_price: number;
  category?: { id: number };
  category_id: number;
}
export interface IFormCheckout {
  userId: number;
  totalAmount: number;
  products: ICheckoutProduct[];
  location: string;
}
