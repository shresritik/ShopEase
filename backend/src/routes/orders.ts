import express from "express";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrdersByUser,
} from "../controller/orders";
import { handleEsewaSuccess } from "../middleware/payment";
import { updateProductAfterPayment } from "../controller/payment";
const router = express();
router.post("/", createOrder);
router.get("/", getAllOrders);
router.post("/success", handleEsewaSuccess, updateProductAfterPayment);
router.get("/:id", getOrdersByUser);
router.delete("/:id", deleteOrderById);
export default router;
