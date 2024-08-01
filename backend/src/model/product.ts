import { Prisma } from "@prisma/client";
import { IProduct, ProductFilter } from "../interface/product";
import { IQuery } from "../interface/utils";
import prisma from "../utils/prisma";
import { IReviews } from "../interface/reviews";

export const getAllProducts = async (query: ProductFilter) => {
  const filters: ProductFilter = query;
  const where: Prisma.ProductWhereInput = {};
  const orderBy: Prisma.ProductOrderByWithRelationInput = {};
  if (filters.search) {
    where.OR = [
      { productName: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.category) {
    where.categoryId = +filters.category;
  }
  if (filters.price) {
    where.sellingPrice = { lte: +filters.price };
  }
  if (filters.rating) {
    where.avgRating = { gte: +filters.rating };
    orderBy.avgRating = { sort: "desc" };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take: filters.size,
    skip: (filters.page! - 1) * filters.size!,
    include: {
      category: {
        select: {
          id: true,
          categoryName: true,
        },
      },
    },
  });
  return products;
};
export const count = async (query: IQuery) => {
  const { q } = query;
  const count = await prisma.product.count({
    where: q ? { productName: { contains: q, mode: "insensitive" } } : {},
  });
  return { count };
};
export const getProductByName = async (productName: string) => {
  return await prisma.product.findFirst({
    where: {
      productName: {
        startsWith: productName,
        mode: "insensitive",
      },
    },
  });
};
export const getProductById = async (id: number) => {
  const prod = await prisma.product.findFirst({
    where: {
      id,
    },

    include: {
      category: {
        select: {
          categoryName: true,
          id: true,
        },
      },
    },
  });
  return prod;
};
export const getProductsByCategory = async (
  category: string,
  query: ProductFilter
) => {
  const { page, size, search } = query;
  const where: Prisma.ProductWhereInput = {};
  if (search) {
    where.AND = [
      { productName: { contains: search, mode: "insensitive" } },
      {
        category: {
          categoryName: { equals: category, mode: "insensitive" },
        },
      },
    ];
  } else {
    where.category = {
      categoryName: { equals: category, mode: "insensitive" },
    };
  }
  return await prisma.product.findMany({
    skip: (page! - 1) * size!,
    take: size,
    where,
    include: {
      category: {
        select: {
          categoryName: true,
          id: true,
        },
      },
    },
  });
};
export const getProductByCategoryAndId = async (
  category: string,
  id: number
) => {
  return await prisma.product.findFirst({
    include: {
      category: true,
    },
    where: {
      id,
      category: {
        categoryName: {
          equals: category,
          mode: "insensitive",
        },
      },
    },
  });
};
export const deleteProduct = async (id: number) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};
export const createProduct = async (userId: number, product: IProduct) => {
  const prod = await prisma.product.create({
    data: {
      productName: product.productName,
      category: {
        connect: {
          id: +product.categoryId,
        },
      },
      pic: product.pic,
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      description: product.description,
      stock: +product.stock,
      productCreator: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return prod;
};
export const updateProduct = async (
  id: number,
  userId: number,
  product: IProduct
) => {
  const prod = await prisma.product.update({
    where: {
      id,
    },
    data: {
      productName: product.productName,
      category: {
        connect: {
          id: +product.categoryId,
        },
      },
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
      description: product.description,
      stock: +product.stock,

      productUpdator: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return prod;
};
export const updateProductStockFromOrder = async (
  productId: number,
  newStock: number
) => {
  return await prisma.product.update({
    where: { id: productId },
    data: { stock: newStock },
  });
};
export const getProductWithReview = async (review: IReviews) => {
  console.log(review);
  return await prisma.product.findFirst({
    where: {
      productName: review.productName,
    },
  });
};
