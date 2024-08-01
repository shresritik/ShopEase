import { BadRequest, NotFound } from "../error";
import { IReviews } from "../interface/reviews";
import { getProductWithReview } from "../model/product";
import * as UserProduct from "../model/reviews";
// create product review
export const createProductReview = async (review: IReviews) => {
  // check for product based on reviews in it
  const product = await getProductWithReview(review);
  if (!product) {
    throw new NotFound("Product not found");
  }
  // check if user has reviewed the product
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
// get all reviews
export const getAllReview = async (productId: number) => {
  const reviewProduct = await UserProduct.getAllReview(productId);
  if (!reviewProduct) {
    throw new BadRequest("Review or rating cannnot be created");
  }
  return reviewProduct;
};
