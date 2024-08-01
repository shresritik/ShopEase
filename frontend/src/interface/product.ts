import { CartItem } from "../types/cartStore";

export interface IProduct {
  id?: number;
  productName: string;
  desc?: string;
  pic: string;
  totalReviews?: number;
  avgRating?: number;
  sellingPrice: number;
  costPrice?: number;
  stock: number;
  category: {
    categoryName: string;
  };
  meta: { page: number; size: number; total: number };
}
export interface MetaCart extends CartItem {
  subtotal: number;
  total: number;
  meta: { total: number; size: number; page: number };
}
export interface ProductsResponse {
  meta: {
    page: number;
    size: number;
    total: number;
  };
  products: MetaCart[];
}

export interface RenderProductsParams {
  products: MetaCart[] | { message: string };
  productList: HTMLElement;
}
