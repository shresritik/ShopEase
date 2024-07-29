import { BadRequest } from "../error";
import { IReviews } from "../interface/reviews";
import * as UserProduct from "../model/reviews";
export const createProductReview = async (review: IReviews) => {
  console.log(review);
  const reviewProduct = await UserProduct.createReview(review);
  if (!reviewProduct) {
    throw new BadRequest("Review or rating cannnot be created");
  }
  return reviewProduct;
};
export const getAllReview = async (productId: number) => {
  const reviewProduct = await UserProduct.getAllReview(productId);
  if (!reviewProduct) {
    throw new BadRequest("Review or rating cannnot be created");
  }
  return reviewProduct;
};
