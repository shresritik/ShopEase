import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controller/users";
import { upload } from "../utils/fileUpload";
const router = express();
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", upload.single("profile-pic"), createUser);
router.put("/:id", upload.single("profile-pic"), updateUser);
router.delete("/:id", deleteUser);
export default router;
