import express from "express";
import {
  createOrder,
  deleteOrderById,
  getAllOrders,
  getOrdersByUser,
} from "../controller/orders";
const router = express();
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrdersByUser);
router.delete("/:id", deleteOrderById);
export default router;
