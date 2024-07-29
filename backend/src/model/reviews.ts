import { IReviews } from "../interface/reviews";
import prisma from "../utils/prisma";

export const createReview = async (review: IReviews, prodId: number) => {
  const reviewInfo = await prisma.review.create({
    data: {
      user_id: review.userId,
      product_id: prodId,
      rating: review.rating,
      review: review.name,
    },
  });
  const aggregations = await prisma.review.aggregate({
    where: { product_id: prodId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  const newAvgRating = aggregations._avg.rating || 0;
  const totalReviews = aggregations._count.rating || 0;

  const clampedAvgRating = Math.min(5, Math.round(newAvgRating * 100) / 100);

  const updatedProduct = await prisma.product.update({
    where: { id: prodId },
    data: {
      avg_rating: clampedAvgRating,
      total_review: totalReviews,
    },
  });

  return { reviewInfo, updatedProduct };
};
export const getAllReview = async (productId: number) => {
  return await prisma.review.findMany({
    where: {
      product_id: productId,
    },
    include: {
      product: true,
      user: true,
    },
  });
};
export const hasUserReviewedProduct = async (
  prodId: number,
  userId: number
) => {
  return await prisma.review.findFirst({
    where: {
      product_id: prodId,
      user_id: userId,
    },
  });
};
