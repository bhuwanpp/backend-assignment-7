import express from "express";
import { login, refresh, signup } from "../controller/auth";
import { auth, authorize } from "../middleware/auth";
import { ROLE } from "../enums/role";
const router = express();
router.post("/login", login);
router.post("/signup", auth, authorize(ROLE.ADMIN), signup);
router.get("/refresh-token", auth, refresh);
export default router;
