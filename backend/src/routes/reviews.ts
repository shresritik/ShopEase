import express from "express";
import { createAReview, getAllReviews } from "../controller/reviews";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";
const router = express();
router.post(
  "/",
  authenticate(),
  authorize([PERMISSION.USER_POST]),
  createAReview
);
router.get("/:id", getAllReviews);

export default router;
