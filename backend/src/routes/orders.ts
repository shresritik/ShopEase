import express from "express";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrdersByUser,
} from "../controller/orders";
import { handleEsewaSuccess } from "../controller/esewa";
const router = express();
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/success", handleEsewaSuccess);
router.get("/:id", getOrdersByUser);
router.delete("/:id", deleteOrderById);
export default router;
