import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategoryAndId,
  updateProduct,
  getProductsByCategory,
} from "../controller/products";
import { authenticate, authorize } from "../middleware/auth";
const router = express();
router.get("/", getAllProducts);
router.post(
  "/",
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  createProduct
);
router.put(
  "/:id",
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  updateProduct
);
router.get("/:category", getProductsByCategory);
router.get("/:category/:id", getProductByCategoryAndId);
router.delete(
  "/:id",
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  deleteProduct
);
export default router;
