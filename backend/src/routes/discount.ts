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
import { validateReqBody, validateReqId } from "../middleware/validator";
import { createDiscountSchema, discountByIdSchema } from "../schema/discount";
const router = express();
/**
 * @swagger
 * /discount:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiscountInput'
 *     responses:
 *       201:
 *         description: Discount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  validateReqBody(createDiscountSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_POST]),
  createADiscount
);
/**
 * @swagger
 * /discount:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: List of all discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Discount'
 */
router.get(
  "/",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),
  getDiscounts
);
/**
 * @swagger
 * /discount/{id}:
 *   get:
 *     summary: Get a discount by ID
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The discount
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       404:
 *         description: Discount not found
 */
router.get(
  "/:id",
  validateReqId(discountByIdSchema),
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),
  getADiscount
);
/**
 * @swagger
 * /discount/{id}:
 *   put:
 *     summary: Update a discount by ID
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDiscountInput'
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Discount'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Discount not found
 */

router.put(
  "/:id",
  validateReqId(discountByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_PUT]),
  updateADiscount
);
/**
 * @swagger
 * /discounts/{id}:
 *   delete:
 *     summary: Delete a discount by ID
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Discount not found
 */

router.delete(
  "/:id",
  validateReqId(discountByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_DELETE]),

  deleteADiscount
);
export default router;
