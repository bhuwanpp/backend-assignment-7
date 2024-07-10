import express from "express";
import { login, refresh, signup } from "../controller/auth";
const router = express();
router.post("/login", login);
router.post("/signup", signup);
router.get("/refresh-token", refresh);
export default router;
