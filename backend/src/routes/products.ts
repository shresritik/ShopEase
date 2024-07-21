import express from "express";
import { getAllProducts } from "../controller/products";
const router = express();
router.get("/", getAllProducts);
export default router;
