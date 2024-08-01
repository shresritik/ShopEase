// Order interface, already defined in the codebase
export interface Order {
  id: number;
  totalAmount: number;
  user?: { name: string };
  profit: number;
  status: string;
  discount?: { percentage: number; code: string };
  createdAt: string;
  OrderProduct: OrderProduct[];
}

// OrderProduct interface, already defined in the codebase
interface OrderProduct {
  category: string;
  netAmount: number;
  productName: string;
  sellingPrice: number;
  costPrice: number;
  pic: string;
  quantity: number;
}

// OrderDetail type derived from the Order interface
export type OrderDetail = {
  id: number;
  totalAmount: number;
  user: string;
  profit: number;
  status: string;
  discountValue: string;
  discountCode?: string;
  createdAt: string;
  products: OrderProduct[];
};
