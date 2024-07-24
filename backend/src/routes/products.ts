import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategoryAndId,
  updateProduct,
  getProductsByCategory,
  getAllCategories,
} from "../controller/products";
import { authenticate, authorize } from "../middleware/auth";
import { uploadProduct } from "../utils/fileUpload";
const router = express();
router.get("/", getAllProducts);
router.get("/categories", getAllCategories);
router.post(
  "/",
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  uploadProduct.single("product"),
  createProduct
);
router.put(
  "/:id",
  authenticate(),
  uploadProduct.single("product"),
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
