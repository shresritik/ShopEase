import express from "express";
import { createAReview, getAllReviews } from "../controller/reviews";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";
import { validateReqBody, validateReqId } from "../middleware/validator";
import { createReviewSchema, getReviewByIdSchema } from "../schema/reviews";
const router = express();
router.post(
  "/",
  validateReqBody(createReviewSchema),
  authenticate(),
  authorize([PERMISSION.USER_POST]),
  createAReview
);
router.get("/:id", validateReqId(getReviewByIdSchema), getAllReviews);

export default router;
