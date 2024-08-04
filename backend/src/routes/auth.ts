import express from "express";
import { login, refresh } from "../controller/auth";
import { loginSchema } from "../schema/auth";
import { validateReqBody } from "../middleware/validator";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/login", validateReqBody(loginSchema), login);
router.post(
  "/refresh",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_POST,
    PERMISSION.ADMIN_POST,
    PERMISSION.USER_POST,
  ]),
  refresh
);

export default router;
