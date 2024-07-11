import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "../controller/todo";
import { auth, authorize } from "../middleware/auth";
import { ROLE } from "../enums/role";

const router = express();
router.get("/", auth, authorize([ROLE.USER, ROLE.ADMIN]), getTask);
router.get("/:id", auth, getTaskById);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
