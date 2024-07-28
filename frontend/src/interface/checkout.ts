import { IProduct } from "./product";

export interface CheckoutCard extends IProduct {
  qty: number;
  delivery: number;
  total: number;
  subtotal: number;
}
