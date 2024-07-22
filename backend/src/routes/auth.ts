import express from "express";
import { login } from "../controller/auth";

const router = express();
// route handler to login a user
router.post("/login", login);
// router handler to generate refresh and access token from previous refresh token
export default router;
