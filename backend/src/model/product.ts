import { Prisma } from "@prisma/client";
import { IProduct, ProductFilter } from "../interface/product";
import { IQuery } from "../interface/utils";
import prisma from "../utils/prisma";
import { IReviews } from "../interface/reviews";
export const getAllCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      category_name: true,
    },
  });
};

export const getAllProducts = async (query: ProductFilter) => {
  const filters: ProductFilter = query;
  const where: Prisma.ProductWhereInput = {};
  if (filters.search) {
    where.OR = [
      { product_name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.category) {
    where.category_id = +filters.category;
  }
  if (filters.price) {
    where.selling_price = { gte: +filters.price };
  }
  if (filters.rating) {
    where.avg_rating = { gte: +filters.rating };
  }

  const products = await prisma.product.findMany({
    where,
    take: filters.size,
    skip: (filters.page! - 1) * filters.size!,
    include: {
      category: {
        select: {
          id: true,
          category_name: true,
        },
      },
    },
  });
  return products;
};
export const count = async (query: IQuery) => {
  const { q } = query;
  const count = await prisma.product.count({
    where: q ? { product_name: { contains: q, mode: "insensitive" } } : {},
  });
  return { count };
};
export const getProductByName = async (product_name: string) => {
  return await prisma.product.findFirst({
    where: {
      product_name: {
        startsWith: product_name,
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
          category_name: true,
          id: true,
        },
      },
    },
  });
  return prod;
};
export const getProductsByCategory = async (
  category: string,
  query: IQuery
) => {
  const { page, size, q } = query;
  return await prisma.product.findMany({
    skip: (page! - 1) * size!,
    take: size,
    where: !q
      ? {
          category: {
            category_name: {
              equals: category,
              mode: "insensitive",
            },
          },
        }
      : {},
    include: {
      category: {
        select: {
          category_name: true,
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
    where: {
      id,
      category: {
        category_name: {
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
      product_name: product.product_name,
      category: {
        connect: {
          id: +product.category_id,
        },
      },
      pic: product.pic,
      cost_price: product.cost_price,
      selling_price: product.selling_price,
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
      product_name: product.product_name,
      category: {
        connect: {
          id: +product.category_id,
        },
      },
      cost_price: product.cost_price,
      selling_price: product.selling_price,
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
  product_id: number,
  newStock: number
) => {
  return await prisma.product.update({
    where: { id: product_id },
    data: { stock: newStock },
  });
};
export const getProductWithReview = async (review: IReviews) => {
  console.log(review);
  return await prisma.product.findFirst({
    where: {
      product_name: review.product_name,
    },
  });
};
