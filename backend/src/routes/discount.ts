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
const router = express();
router.post("/", createADiscount);
router.get("/", getDiscounts);
router.get("/:id", getADiscount);
router.delete("/:id", deleteADiscount);
router.put("/:id", updateADiscount);

export default router;
