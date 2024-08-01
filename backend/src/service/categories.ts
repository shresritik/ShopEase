import { Category } from "@prisma/client";
import * as CategoryModel from "../model/categories";
import { NotFound } from "../error";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("CategoryService");
// get all categories
export const getCategories = async () => {
  const cat = await CategoryModel.getAllCategories();
  if (!cat || cat.length == 0) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  logger.info("Get all Categories");
  return cat;
};
// create a category
export const createCategory = async (category: Category) => {
  const cat = await CategoryModel.createCategories(category);
  logger.info("Category created");

  return cat;
};
// create a category by id
export const getCategoryById = async (id: number) => {
  const cat = await CategoryModel.getCategoryById(id);
  if (!cat) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  return cat;
};
// delete a category by id

export const deleteCategory = async (id: number) => {
  const cat = await CategoryModel.getCategoryById(id);
  if (!cat) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  await CategoryModel.deleteCategoryById(id);
  return cat;
};
// update a category by id
export const updateCategory = async (id: number, category: Category) => {
  const cat = await CategoryModel.getCategoryById(id);
  if (!cat) {
    logger.warn("No Categories found");
    throw new NotFound("No categories found");
  }
  const updatedcat = await CategoryModel.updateCategoryById(id, category);
  return updatedcat;
};
