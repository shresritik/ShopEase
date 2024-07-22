import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/users";
import { upload } from "../utils/fileUpload";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "@prisma/client";
const router = express();
router.get(
  "/",
  authenticate,

  authorize([
    PERMISSION.SUPER_ADMIN_GET,
    PERMISSION.ADMIN_GET,
    PERMISSION.USER_GET,
  ]),

  getUsers
);
router.get("/:id", getUserById);
router.post(
  "/",
  // authenticate,
  // authorize(
  //   [PERMISSION.SUPER_ADMIN_POST, PERMISSION.ADMIN_POST, PERMISSION.USER_POST],
  //   true
  // ),
  upload.single("profile-pic"),
  createUser
);
router.put(
  "/:id",
  authenticate,
  authorize([
    PERMISSION.SUPER_ADMIN_PUT,
    PERMISSION.ADMIN_PUT,
    PERMISSION.USER_PUT,
  ]),
  upload.single("profile-pic"),
  updateUser
);
router.delete(
  "/:id",

  authorize([
    PERMISSION.SUPER_ADMIN_DELETE,
    PERMISSION.ADMIN_DELETE,
    PERMISSION.USER_DELETE,
  ]),
  deleteUser
);
export default router;
