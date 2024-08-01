import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategoryAndId,
  updateProduct,
  getProductsByCategory,
  getProductByName,
} from "../controller/products";
import { authenticate, authorize } from "../middleware/auth";
import { uploadProduct } from "../utils/fileUpload";
import {
  validateReqBody,
  validateReqId,
  validateReqQuery,
} from "../middleware/validator";
import {
  createProductSchema,
  getProductByQuerySchema,
  productByIdSchema,
} from "../schema/products";
const router = express();
router.get("/", validateReqQuery(getProductByQuerySchema), getAllProducts);
router.post(
  "/",
  uploadProduct.single("product"),
  validateReqBody(createProductSchema),
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  createProduct
);
router.put(
  "/:id",
  uploadProduct.single("product"),
  validateReqId(productByIdSchema),
  authenticate(),
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
  validateReqId(productByIdSchema),
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  deleteProduct
);
export default router;
