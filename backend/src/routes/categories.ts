import express from "express";
import {
  createCategories,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
} from "../controller/categories";
import { PERMISSION } from "@prisma/client";
import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqId } from "../middleware/validator";
import { categoryByIdSchema, createCategorySchema } from "../schema/categories";
const router = express();
router.post(
  "/",
  validateReqBody(createCategorySchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_POST, PERMISSION.ADMIN_POST]),
  createCategories
);
router.get(
  "/",

  getAllCategories
);
router.delete(
  "/:id",
  validateReqId(categoryByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_DELETE, PERMISSION.ADMIN_DELETE]),
  deleteCategoryById
);
router.put(
  "/:id",
  validateReqId(categoryByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_PUT, PERMISSION.ADMIN_PUT]),
  updateCategoryById
);
export default router;
