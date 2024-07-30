import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  getUserEmail,
} from "../controller/users";
import { uploadProfile } from "../utils/fileUpload";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";
import { validateReqBody, validateReqId } from "../middleware/validator";
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
  getUserByQuerySchema,
} from "../schema/user";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           $ref: '#/components/schemas/GetUserByQuery/properties/q'
 *       - in: query
 *         name: page
 *         schema:
 *           $ref: '#/components/schemas/GetUserByQuery/properties/page'
 *       - in: query
 *         name: size
 *         schema:
 *           $ref: '#/components/schemas/GetUserByQuery/properties/size'
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CreateUserInput'
 */
router.get(
  "/",
  authenticate(),
  authorize(
    [PERMISSION.SUPER_ADMIN_GET, PERMISSION.ADMIN_GET, PERMISSION.USER_GET],
    true
  ),
  validateReqBody(getUserByQuerySchema),
  getUsers
);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retrieve the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserInput'
 */
router.get(
  "/me",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),
  getUser
);
router.post(
  "/email",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),
  getUserEmail
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/GetUserById/properties/id'
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserInput'
 */
router.get("/:id", validateReqId(getUserByIdSchema), getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 */
router.post(
  "/",
  uploadProfile.single("profile-pic"),
  authenticate(true),
  authorize(
    [PERMISSION.SUPER_ADMIN_POST, PERMISSION.ADMIN_POST, PERMISSION.USER_POST],
    true
  ),

  // validateReqBody(createUserSchema),
  createUser
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/GetUserById/properties/id'
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: Updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 */
router.put(
  "/:id",
  uploadProfile.single("profile-pic"),
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_PUT,
    PERMISSION.ADMIN_PUT,
    PERMISSION.USER_PUT,
  ]),
  validateReqBody(updateUserSchema),
  updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/GetUserById/properties/id'
 *     responses:
 *       204:
 *         description: No Content
 */
router.delete(
  "/:id",
  authenticate(),
  authorize([
    PERMISSION.SUPER_ADMIN_DELETE,
    PERMISSION.ADMIN_DELETE,
    PERMISSION.USER_DELETE,
  ]),
  validateReqId(getUserByIdSchema),
  deleteUser
);

export default router;
