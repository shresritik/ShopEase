import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategoryAndId,
  updateProduct,
  getProductsByCategory,
  getAllCategories,
  getProductByName,
} from "../controller/products";
import { authenticate, authorize } from "../middleware/auth";
import { uploadProduct } from "../utils/fileUpload";
import { validateReqQuery } from "../middleware/validator";
import { getProductByQuerySchema } from "../schema/products";
const router = express();
router.get("/", validateReqQuery(getProductByQuerySchema), getAllProducts);
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
router.get(
  "/:category",
  validateReqQuery(getProductByQuerySchema),
  getProductsByCategory
);
router.post("/me", getProductByName);
router.get(
  "/:category/:id",
  validateReqQuery(getProductByQuerySchema),
  getProductByCategoryAndId
);
router.delete(
  "/:id",
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  deleteProduct
);
export default router;
