export interface IOrder_Product {
  id: number;
  quantity: number;
  selling_price: number;
  cost_price: number;
  category_id: number;
}
export interface IOrder {
  userId: number;
  totalAmount: number;
  location: string;
  products: IOrder_Product[];
  discount?: string;
}
