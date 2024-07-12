export interface ITask {
  todo: string;
}

export interface IALLTasks extends ITask {
  id: string;
  userId: string;
}
