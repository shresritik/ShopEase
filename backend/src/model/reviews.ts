import { IReviews } from "../interface/reviews";
import prisma from "../utils/prisma";

export const createReview = async (review: IReviews) => {
  const product = await prisma.product.findFirst({
    where: {
      product_name: review.product_name,
    },
  });
  if (!product) {
    throw new Error("Product not found");
  }
  const reviewInfo = await prisma.review.create({
    data: {
      user_id: review.userId,
      product_id: product.id,
      rating: review.rating,
      review: review.name,
    },
  });
  const aggregations = await prisma.review.aggregate({
    where: { product_id: product.id },
    _avg: { rating: true },
    _count: { rating: true },
  });

  const newAvgRating = aggregations._avg.rating || 0;
  const totalReviews = aggregations._count.rating || 0;

  const clampedAvgRating = Math.min(5, Math.round(newAvgRating * 100) / 100);

  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
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
