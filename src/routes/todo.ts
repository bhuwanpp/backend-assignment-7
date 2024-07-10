import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "../controller/todo";
import { auth } from "../middleware/auth";

const router = express();
router.get("/", auth, getTask);
router.get("/:id", auth, getTaskById);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
