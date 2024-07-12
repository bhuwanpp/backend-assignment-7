import { ROLE } from "../enums/role";
import { IALLTasks, ITask } from "../interfaces/todo";
import { tasks } from "../mockdata/todo";

/**
 * Retrieves all tasks.
 * @param {string} userId - The ID of the user.
 * @returns {IALLTasks[]} An array containing all tasks.
 */
export function getTasks(id: string, role: ROLE | ROLE[]): IALLTasks[] {
  if (role === ROLE.ADMIN) {
    return tasks;
  }
  const todoList = tasks.filter((todo) => todo.userId === id);
  return todoList;
}

/**
 * Retrieves a task by its ID for a specific user.
 * @param {string} id The ID of the task to retrieve.
 * @param {string} userId The ID of the user.
 * @returns {IALLTasks | undefined} The task object if found for the specified user, otherwise undefined.
 */
export function getTaskById(id: string, userId: string): IALLTasks | undefined {
  return tasks.find((task) => task.id === id && task.userId === userId);
}

/**
 * Creates a new task and adds it to the tasks array.
 * @param {ITask} task The task object to create.
 * @param {string} userId - The ID of the user.
 * @returns {number} The new length of the tasks array after adding the task.
 */
export function createTask(task: ITask, userId: string): number {
  return tasks.unshift({
    id: `${tasks.length + 1}`,
    ...task,
    userId,
  });
}

/**
 * Updates an existing task by its ID.
 * @param {string} id The ID of the task to update.
 * @param {ITask} task The updated task object.
 * @param {string} userId - The ID of the user.
 * @returns {number} The index of the updated task in the tasks array, or -1 if not found.
 */
export function updateTask(id: string, task: ITask, userId: string): number {
  const index = tasks.findIndex(
    (task) => task.id === id && task.userId === userId
  );
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...task };
  }
  return index;
}

/**
 * Deletes a task by its ID.
 * @param {string} id The ID of the task to delete.
 * @param {string} userId - The ID of the user.
 * @returns {number} The index of the deleted task in the tasks array, or -1 if not found.
 */
export function deleteTask(id: string, userId: string): number {
  const index = tasks.findIndex(
    (task) => task.id === id && task.userId === userId
  );
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  return index;
}
