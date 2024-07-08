import express from "express";
import taskRouter from "./todo";

const router = express();

router.use("/tasks", taskRouter);

export default router;
