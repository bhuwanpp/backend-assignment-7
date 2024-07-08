import { IALLTasks, ITask } from "../interfaces/todo";

const tasks: IALLTasks[] = [
  { id: "1", todo: "learn nvim" },
  { id: "2", todo: "learn linux" },
];

/**
 * Retrieves all tasks.
 * @returns {IALLTasks[]} An array containing all tasks.
 */
export function getAllTasks(): IALLTasks[] {
  return tasks;
}

/**
 * Retrieves a task by its ID.
 * @param {string} id The ID of the task to retrieve.
 * @returns {ITask | undefined} The task object if found, otherwise undefined.
 */
export function getTaskById(id: string): IALLTasks | undefined {
  return tasks.find(({ id: userId }) => userId === id);
}

/**
 * Creates a new task and adds it to the tasks array.
 * @param {ITask} task The task object to create.
 * @returns {number} The new length of the tasks array after adding the task.
 */
export function createTask(task: ITask): number {
  return tasks.unshift({
    id: `${tasks.length + 1}`,
    ...task,
  });
}

/**
 * Updates an existing task by its ID.
 * @param {string} id The ID of the task to update.
 * @param {ITask} task The updated task object.
 * @returns {number} The index of the updated task in the tasks array, or -1 if not found.
 */
export function updateTask(id: string, task: ITask): number {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...task };
  }
  return index;
}

/**
 * Deletes a task by its ID.
 * @param {string} id The ID of the task to delete.
 * @returns {number} The index of the deleted task in the tasks array, or -1 if not found.
 */
export function deleteTask(id: string): number {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  return index;
}
