import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  updateTask,
} from "../controller/todo";

const router = express();
router.get("/", getTask);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
