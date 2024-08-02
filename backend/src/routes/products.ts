import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByCategoryAndId,
  updateProduct,
  getProductsByCategory,
  getProductByName,
} from "../controller/products";
import { authenticate, authorize } from "../middleware/auth";
import { uploadProduct } from "../utils/fileUpload";
import {
  validateReqBody,
  validateReqId,
  validateReqQuery,
} from "../middleware/validator";
import {
  createProductSchema,
  getProductByQuerySchema,
  productByIdSchema,
} from "../schema/products";
const router = express();
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
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
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", validateReqQuery(getProductByQuerySchema), getAllProducts);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - productName
 *               - categoryId
 *               - costPrice
 *               - sellingPrice
 *               - description
 *               - stock
 *             properties:
 *               product:
 *                 type: string
 *                 format: binary
 *               productName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               categoryId:
 *                 type: integer
 *                 minimum: 1
 *               costPrice:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *               sellingPrice:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.post(
  "/",
  uploadProduct.single("product"),
  validateReqBody(createProductSchema),
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  createProduct
);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 format: binary
 *               productName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *               categoryId:
 *                 type: integer
 *                 minimum: 1
 *               costPrice:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *               sellingPrice:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *               description:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 1000
 *               stock:
 *                 type: integer
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.put(
  "/:id",
  uploadProduct.single("product"),
  validateReqId(productByIdSchema),
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  updateProduct
);
/**
 * @swagger
 * /products/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
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
 *         description: List of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get(
  "/:category",
  validateReqQuery(getProductByQuerySchema),
  getProductsByCategory
);
/**
 * @swagger
 * /products/me:
 *   post:
 *     summary: Get product by name
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.post("/me", getProductByName);
/**
 * @swagger
 * /products/{category}/{id}:
 *   get:
 *     summary: Get product by category and id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *       - in: query
 *         name: rating
 *         schema:
 *           type: string
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
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get(
  "/:category/:id",
  validateReqQuery(getProductByQuerySchema),
  getProductByCategoryAndId
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
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
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */
router.delete(
  "/:id",
  validateReqId(productByIdSchema),
  authenticate(),
  authorize(["SUPER_ADMIN_POST", "ADMIN_POST"]),
  deleteProduct
);
export default router;
