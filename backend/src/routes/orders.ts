import express from "express";
import {
  createOrder,
  deleteOrderById,
  generatePaymentForm,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
} from "../controller/orders";
import { handleEsewaSuccess } from "../middleware/payment";
import { updateProductAfterPayment } from "../controller/payment";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";
import { validateReqBody, validateReqId } from "../middleware/validator";
import { getOrderByBodySchema, orderByIdSchema } from "../schema/order";
const router = express();
router.post(
  "/",
  validateReqBody(getOrderByBodySchema),
  authenticate(),
  authorize([PERMISSION.USER_POST]),
  createOrder
);
router.get(
  "/",
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_GET, PERMISSION.ADMIN_GET]),
  getAllOrders
);
router.post("/success", handleEsewaSuccess, updateProductAfterPayment);
router.post(
  "/payment",
  authenticate(),
  authorize([PERMISSION.USER_POST]),
  generatePaymentForm
);
router.get(
  "/:id",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),

  getOrdersByUser
);
router.delete(
  "/:id",
  validateReqId(orderByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_GET, PERMISSION.ADMIN_GET]),
  deleteOrderById
);
router.get(
  "/order/:id",
  validateReqId(orderByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_GET, PERMISSION.ADMIN_GET]),
  getOrderById
);
export default router;
