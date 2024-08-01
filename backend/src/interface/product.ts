export interface IProduct {
  productName: string;
  description: string;
  pic?: string;
  totalReviews?: number;
  avgRating?: number;
  sellingPrice: number;
  costPrice: number;
  categoryId: number;
  totalReview?: number;
  createdBy: number;
  stock: number;
}
export interface ProductFilter {
  search?: string;
  price?: number;
  category?: number;
  rating?: number;
  size?: number;
  page?: number;
}
