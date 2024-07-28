export interface IProduct {
  product_name: string;
  description: string;
  pic?: string;
  total_reviews?: number;
  avg_rating?: number;
  selling_price: number;
  cost_price: number;
  category_id: number;
  total_review?: number;
  createdBy: number;
  stock: number;
}
export interface ProductFilter {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: number;
  inStock?: boolean;
  minRating?: number;
  size?: number;
  page?: number;
}
