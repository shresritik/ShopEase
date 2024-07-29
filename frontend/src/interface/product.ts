export interface IProduct {
  id?: number;
  product_name: string;
  desc?: string;
  pic: string;
  total_reviews?: number;
  avg_rating?: number;
  selling_price: number;
  cost_price?: number;
  stock: number;
  category: {
    category_name: string;
  };
  meta: {
    total: number;
    size: number;
    page: number;
  };
}
