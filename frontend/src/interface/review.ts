export interface IReview {
  name: string;
  userId: number;
  product_name: string;
  rating?: number;
}
export interface IReviewDetails {
  name: string;
  user: { name: string; pic: string };
  rating: number;
  review?: string;
}
