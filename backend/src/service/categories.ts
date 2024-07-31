import { Category } from "@prisma/client";
import {
  createCategories,
  defaultCategoryById,
  getAllCategories,
  updateCategoryById,
} from "../model/categories";

export const getCategories = async () => {
  const cat = await getAllCategories();
  return cat;
};
export const createCategory = async (category: Category) => {
  const cat = await createCategories(category);
  return cat;
};
export const deleteCategory = async (id: number) => {
  const cat = await defaultCategoryById(id);
  return cat;
};
export const updateCategory = async (id: number, category: Category) => {
  const cat = await updateCategoryById(id, category);
  return cat;
};
