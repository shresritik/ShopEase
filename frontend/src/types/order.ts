// Order interface, already defined in the codebase
export interface Order {
  id: number;
  total_amount: number;
  user?: { name: string };
  profit: number;
  status: string;
  discount?: { percentage: number; code: string };
  createdAt: string;
  Order_Product: OrderProduct[];
}

// OrderProduct interface, already defined in the codebase
interface OrderProduct {
  category: string;
  net_amount: number;
  productName: string;
  selling_price: number;
  cost_price: number;
  pic: string;
  quantity: number;
}

// OrderDetail type derived from the Order interface
export type OrderDetail = {
  id: number;
  total_amount: number;
  user: string;
  profit: number;
  status: string;
  discountValue: string;
  discountCode?: string;
  createdAt: string;
  products: OrderProduct[];
};
