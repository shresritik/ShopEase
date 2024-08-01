import { MetaCart } from "../interface/product";

export type CartItem = {
  id?: number;
  stock: number;
  qty: number;
  pic: string;
  productName: string;
  sellingPrice: number;
  category: { categoryName: string; id?: number };
  subtotal: number;
  total: number;
  meta: { total: number; size: number; page: number };
};

export type CartState = MetaCart[];

export type CartAction =
  | { type: "INCREMENT"; payload: CartItem }
  | { type: "DECREMENT"; payload: { id: number; stock: number } }
  | { type: "REMOVE"; payload: { id: number } }
  | { type: "RESET" }
  | { type: "CHECKOUT"; payload: CartItem[] };
