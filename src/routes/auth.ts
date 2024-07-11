import express from "express";
import { login, refresh, signup } from "../controller/auth";
import { auth } from "../middleware/auth";
const router = express();
router.post("/login", login);
router.post("/signup", auth, signup);
router.get("/refresh-token", refresh);
router.post("/logout", refresh);
export default router;
