export interface IProduct {
  product_name: string;
  desc: string;
  pic: string;
  total_reviews?: number;
  avg_rating?: number;
  selling_price: number;
  cost_price: number;
}
