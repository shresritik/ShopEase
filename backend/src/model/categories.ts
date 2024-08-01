import { Category } from "@prisma/client";
import prisma from "../utils/prisma";

export const createCategories = async (category: Category) => {
  return await prisma.category.create({
    data: {
      categoryName: category.categoryName,
    },
  });
};

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    select: {
      id: true,
      categoryName: true,
    },
  });
};
export const deleteCategoryById = async (id: number) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};
export const getCategoryById = async (id: number) => {
  return await prisma.category.findFirst({
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
      categoryName: category.categoryName,
    },
  });
};
