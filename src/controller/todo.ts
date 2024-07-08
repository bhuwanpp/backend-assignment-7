import { Request, Response } from "express";
import * as taskService from "../service/todo";

/**
 * Retrieves all tasks.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
export function getTask(req: Request, res: Response) {
  const data = taskService.getTasks();
  res.send({ data });
}

/**
 * Retrieves a task by its ID.
 * @param {Request} req - The Express Request object containing the task ID in req.params.
 * @param {Response} res - The Express Response object.
 */
export function getTaskById(req: Request, res: Response) {
  const { id } = req.params;
  const data = taskService.getTaskById(id);
  res.send(data);
}

/**
 * Creates a new task.
 * @param {Request} req - The Express Request object containing the task data in req.body.
 * @param {Response} res - The Express Response object.
 */
export function createTask(req: Request, res: Response) {
  const { body } = req;
  taskService.createTask(body);
  res.json({
    message: "user created ",
    ...body,
  });
}

/**
 * Updates an existing task.
 * @param {Request} req - The Express Request object containing the task ID in req.params and updated data in req.body.
 * @param {Response} res - The Express Response object.
 */
export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  taskService.updateTask(id, body);
  res.json({
    message: "task  updated ",
    ...body,
  });
}

/**
 * Deletes a task.
 * @param {Request} req - The Express Request object containing the task ID in req.params.
 * @param {Response} res - The Express Response object.
 */
export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  taskService.deleteTask(id);
  res.json({
    message: "task deleted ",
    ...body,
  });
}
