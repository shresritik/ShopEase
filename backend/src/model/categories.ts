import { Category } from "@prisma/client";
import prisma from "../utils/prisma";

export const createCategories = async (category: Category) => {
  return await prisma.category.create({
    data: {
      category_name: category.category_name,
    },
  });
};

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      category_name: true,
    },
  });
};
export const defaultCategoryById = async (id: number) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};
export const updateCategoryById = async (id: number, category: Category) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      category_name: category.category_name,
    },
  });
};
