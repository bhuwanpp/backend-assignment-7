import express from "express";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/user";
import { auth, authorize } from "../middleware/auth";
import { ROLE } from "../enums/role";
const router = express();
router.get("/", auth, authorize(ROLE.ADMIN), getUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, authorize(ROLE.ADMIN), updateUser);
router.delete("/:id", auth, authorize(ROLE.ADMIN), deleteUser);
export default router;
