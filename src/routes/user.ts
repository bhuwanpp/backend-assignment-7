import express from "express";
import {
  deleteUser,
  getUseerById,
  getUsers,
  updateUser,
} from "../controller/user";
import { auth } from "../middleware/auth";
const router = express();
router.get("/", auth, getUsers);
router.get("/:id", auth, getUseerById);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
export default router;
