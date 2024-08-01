import { IProduct } from "./product";

interface User {
  name: string;
}

interface Discount {
  percentage: number;
  code: string;
}

interface Category {
  categoryName: string;
}

interface Product {
  productName: string;
  sellingPrice: number;
  costPrice: number;
  pic: string;
}

export interface OrderProduct {
  category: Category;
  netAmount: number;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  totalAmount: number | null;
  user: User | null;
  profit: number;
  vat: number;
  status: string;
  discount: Discount | null;
  createdAt: Date;
  OrderProduct: OrderProduct[];
}

export interface OrderProductDetail {
  category: string;
  netAmount: number;
  productName: string;
  sellingPrice: number;
  costPrice: number;
  pic: string;
  quantity: number;
}

export interface OrderDetail {
  id: string;
  totalAmount: number;
  user: string;
  profit: number;
  vat: number;
  status: string;
  discountValue: string;
  discountCode: string | undefined;
  createdAt: Date;
  products: OrderProductDetail[][];
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
// export interface IIProduct {
//   pic: string;
//   productName: string;
//   category: string;
//   quantity: number;
//   sellingPrice: number;
//   costPrice: number;
//   netAmount: number;
// }
// export interface IIOrderView {
//   id: string;
//   user: string | null;
//   createdAt: string | Date;
//   products: IIProduct[][];
//   discountCode?: string;
//   discountValue?: string;
//   vat: number;
//   totalAmount: number;
//   profit: number;
//   status: string;
// }
