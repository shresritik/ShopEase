import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";
import {
  createADiscount,
  deleteADiscount,
  getADiscount,
  getDiscounts,
  updateADiscount,
} from "../controller/discount";
import { validateReqBody, validateReqId } from "../middleware/validator";
import { createDiscountSchema, discountByIdSchema } from "../schema/discount";
const router = express();
router.post(
  "/",
  validateReqBody(createDiscountSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_POST]),
  createADiscount
);
router.get(
  "/",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),
  getDiscounts
);
router.get(
  "/:id",
  validateReqId(discountByIdSchema),
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),
  getADiscount
);
router.delete(
  "/:id",
  validateReqId(discountByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_DELETE]),

  deleteADiscount
);
router.put(
  "/:id",
  validateReqId(discountByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_PUT]),
  updateADiscount
);

export default router;
