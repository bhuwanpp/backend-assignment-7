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
import { validateReqBody, validateReqParams } from "../middleware/validator";
import { getCreateTaskSchema, querySchema } from "../schema/todo";

const router = express();
router.get("/", auth, authorize([ROLE.USER, ROLE.ADMIN]), getTask);
router.post("/", validateReqBody(getCreateTaskSchema), auth, createTask);
router.get("/:id", validateReqParams(querySchema), auth, getTaskById);
router.put("/:id", validateReqParams(querySchema), validateReqBody(getCreateTaskSchema), auth, updateTask);
router.delete("/:id", validateReqParams(querySchema), auth, deleteTask);

export default router;
