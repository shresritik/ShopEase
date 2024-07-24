import { IProduct } from "../interface/product";
import prisma from "../utils/prisma";
export const getAllCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      category_name: true,
    },
  });
};
export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          category_name: true,
        },
      },
    },
  });
  return products;
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
        },
      },
    },
  });
  return prod;
};
export const getProductsByCategory = async (category: string) => {
  return await prisma.product.findMany({
    where: {
      category: {
        category_name: {
          equals: category,
          mode: "insensitive",
        },
      },
    },
    include: {
      category: {
        select: {
          category_name: true,
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
      productUpdator: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return prod;
};
