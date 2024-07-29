import express from "express";
import { createAReview, getAllReviews } from "../controller/reviews";
const router = express();
router.post("/", createAReview);
router.get("/:id", getAllReviews);

export default router;
