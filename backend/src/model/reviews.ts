import { IReviews } from "../interface/reviews";
import prisma from "../utils/prisma";

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
    _count: { rating: true },
  });

  const newAvgRating = aggregations._avg.rating || 0;
  const totalReviews = aggregations._count.rating || 0;

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
