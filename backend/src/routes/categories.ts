import express from "express";
import {
  createCategories,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
} from "../controller/categories";
import { getCategories } from "../service/categories";
const router = express();
router.post("/", createCategories);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategoryById);
router.put("/:id", updateCategoryById);
export default router;
