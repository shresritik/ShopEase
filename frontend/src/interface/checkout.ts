import { IProduct } from "./product";

export interface CheckoutCard extends IProduct {
  qty: number;
  total: number;
  subtotal: number;
}
export interface ICheckoutProduct {
  id: number;
  quantity?: number;
  qty?: number;
  sellingPrice: number;
  category?: { id: number };
  categoryId: number;
}
export interface IFormCheckout {
  userId: number;
  totalAmount: number;
  products: ICheckoutProduct[];
  location: string;
}
