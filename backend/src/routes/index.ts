import express from "express";
import userRouter from "./users";
import productRouter from "./products";
import authRouter from "./auth";
const router = express();
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);
export default router;
