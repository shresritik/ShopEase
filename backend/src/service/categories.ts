import { Category } from "@prisma/client";
import * as CategoryModel from "../model/categories";
import { NotFound } from "../error";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("CategoryService");

export const getCategories = async () => {
  const cat = await CategoryModel.getAllCategories();
  if (!cat || cat.length == 0) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  logger.info("Get all Categories");
  return cat;
};
export const createCategory = async (category: Category) => {
  const cat = await CategoryModel.createCategories(category);
  logger.info("Category created");

  return cat;
};
export const getCategoryById = async (id: number) => {
  const cat = await CategoryModel.getCategoryById(id);
  if (!cat) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  return cat;
};
export const deleteCategory = async (id: number) => {
  const cat = await CategoryModel.getCategoryById(id);
  if (!cat) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  await CategoryModel.deleteCategoryById(id);
  return cat;
};
export const updateCategory = async (id: number, category: Category) => {
  const cat = await CategoryModel.getCategoryById(id);
  if (!cat) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  const updatedcat = await CategoryModel.updateCategoryById(id, category);
  return updatedcat;
};
