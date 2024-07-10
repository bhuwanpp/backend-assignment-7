import express from "express";
import { getUseerById, getUsers } from "../controller/user";
import { auth } from "../middleware/auth";
const router = express();
router.get("/", auth, getUsers);
router.get("/:id", auth, getUseerById);
export default router;
