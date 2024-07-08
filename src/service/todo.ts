import { IALLTasks, ITask } from "../interface/todo";
import * as TaskModel from "../model/todo";

/**
 * Retrieves all tasks.
 * @returns {IALLTasks[]} - An array of all tasks.
 */
export function getTasks(): IALLTasks[] {
  const data = TaskModel.getAllTasks();
  return data;
}

/**
 * Retrieves a task by its ID.
 * @param {string} id - The ID of the task to retrieve.
 * @returns {IALLTasks | { error: string }} - The task object if found, otherwise an error object.
 */
export function getTaskById(id: string): IALLTasks | { error: string } {
  const data = TaskModel.getTaskById(id);
  if (!data) {
    return {
      error: `task with id:${id} not found`,
    };
  }
  return data;
}

/**
 * Creates a new task.
 * @param {ITask} task - The task object to create.
 */
export function createTask(task: ITask) {
  TaskModel.createTask(task);
}

/**
 * Updates an existing task.
 * @param {string} id - The ID of the task to update.
 * @param {ITask} task - The updated task.
 * @returns {void | { error: string }} - Returns nothing if successful, otherwise an error object.
 */
export function updateTask(id: string, task: ITask): void | { error: string } {
  const data = TaskModel.updateTask(id, task);
  if (data === -1) {
    return {
      error: `task with id:${id} not found `,
    };
  }
}

/**
 * Deletes a task by its ID.
 * @param {string} id - The ID of the task to delete.
 * @returns {void | { error: string }} - Returns nothing if successful, otherwise an error object.
 */
export function deleteTask(id: string): void | { error: string } {
  const data = TaskModel.deleteTask(id);
  if (data === -1) {
    return {
      error: `task with id:${id} not found `,
    };
  }
}
