import express from "express";
import {
  createOrder,
  deleteOrderById,
  generatePaymentForm,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
} from "../controller/orders";
import { handleEsewaSuccess } from "../middleware/payment";
import { updateProductAfterPayment } from "../controller/payment";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";
import { validateReqBody, validateReqId } from "../middleware/validator";
import { getOrderByBodySchema, orderByIdSchema } from "../schema/order";
const router = express();
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  validateReqBody(getOrderByBodySchema),
  authenticate(),
  authorize([PERMISSION.USER_POST]),
  createOrder
);
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *           default: 10
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_GET, PERMISSION.ADMIN_GET]),
  getAllOrders
);
router.post("/success", handleEsewaSuccess, updateProductAfterPayment);
router.post(
  "/payment",
  authenticate(),
  authorize([PERMISSION.USER_POST]),
  generatePaymentForm
);
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
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
 *         description: The order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.get(
  "/:id",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),

  getOrdersByUser
);
/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
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
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.delete(
  "/:id",
  validateReqId(orderByIdSchema),
  authenticate(),
  authorize([PERMISSION.SUPER_ADMIN_GET, PERMISSION.ADMIN_GET]),
  deleteOrderById
);
router.get(
  "/order/:id",
  validateReqId(orderByIdSchema),
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),
  getOrderById
);
export default router;
