import { BadRequest, NotFound } from "../error";
import { IReviews } from "../interface/reviews";
import { getProductWithReview } from "../model/product";
import * as UserProduct from "../model/reviews";
export const createProductReview = async (review: IReviews) => {
  const product = await getProductWithReview(review);
  if (!product) {
    throw new NotFound("Product not found");
  }
  const user = await UserProduct.hasUserReviewedProduct(
    product.id,
    review.userId
  );
  if (user) {
    throw new BadRequest("User already reviewed");
  }
  const reviewProduct = await UserProduct.createReview(review, product.id);
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
