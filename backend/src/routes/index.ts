import express from "express";
import userRouter from "./users";
import productRouter from "./products";
const router = express();
router.use("/api/users", userRouter);
router.use("/api/users", productRouter);
export default router;
