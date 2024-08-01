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
  meta: {
    total: number;
    size: number;
    page: number;
  };
}
