import { IReviews } from "../interface/reviews";
import prisma from "../utils/prisma";
/**
 * aggregate the review count and rating
 * @param review review body
 * @param prodId product id
 * @returns review info and product
 */
export const createReview = async (review: IReviews, prodId: number) => {
  const reviewInfo = await prisma.review.create({
    data: {
      userId: review.userId,
      productId: prodId,
      rating: review.rating,
      review: review.name,
    },
  });
  const aggregations = await prisma.review.aggregate({
    where: { productId: prodId },
    _avg: { rating: true },
    _count: { rating: true, review: true },
  });

  const newAvgRating = aggregations._avg.rating || 0;
  const totalReviews = aggregations._count.review || 0;

  const clampedAvgRating = Math.min(5, Math.round(newAvgRating * 100) / 100);

  const updatedProduct = await prisma.product.update({
    where: { id: prodId },
    data: {
      avgRating: clampedAvgRating,
      totalReview: totalReviews,
    },
  });

  return { reviewInfo, updatedProduct };
};
/**
 *
 * @param productId
 * @returns reviews
 */
export const getAllReview = async (productId: number) => {
  return await prisma.review.findMany({
    where: {
      productId: productId,
    },
    include: {
      product: true,
      user: true,
    },
  });
};
/**
 *
 * @param prodId
 * @param userId
 * @returns product reviewed by the user
 */
export const hasUserReviewedProduct = async (
  prodId: number,
  userId: number
) => {
  return await prisma.review.findFirst({
    where: {
      productId: prodId,
      userId: userId,
    },
  });
};
