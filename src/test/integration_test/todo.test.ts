import expect from "expect";
import express from "express";
import HttpStatusCodes from "http-status-codes";
import { sign } from "jsonwebtoken";
import request from "supertest";
import * as TaskModel from "../../../src/model/todo";
import config from "../../config";
import { ROLE } from "../../enums/role";
import { tasks } from "../../mockdata/todo";
import router from "../../routes";
import { UserWithoutPassword } from "../../interfaces/user";
import { genericErrorHandler } from "../../middleware/errorHandler";
const generateToken = (payload: UserWithoutPassword) => {
  return sign(payload, config.jwt.secret!, { expiresIn: "1h" });
};
describe("Todo Integrarion test suite", () => {
  const tokenPayload = {
    userId: "2",
    name: "user2",
    email: "two@gmail.com",
    role: ROLE.USER,
  };
  const token = generateToken(tokenPayload);
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(genericErrorHandler);

  // get tasks
  describe("getTask API Test", () => {
    it("Should return all tasks for admin user", async () => {
      const id = "2";
      const role = ROLE.USER;
      const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
      const expectTasks = await TaskModel.getTasks(id, role);
      expect(response.body.data).toEqual(expectTasks);
      console.log(response.body.data);
    });
  });

  // create tasks
  describe("createTask API Test", () => {
    it("Should create a new task for the user", async () => {
      const newTask = {
        todo: "New Task",
      };

      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send(newTask);

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body.message).toBe("task created ");
      expect(response.body.todo).toBe(newTask.todo);
    });
  });
  // get tasks by id
  describe("getTaskById API Test", () => {
    it("Should return the task with the specified ID for the user", async () => {
      const taskId = "1";

      const response = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(taskId);
      console.log(response.body);
    });
  });
  // Test for updateTask API
  describe("updateTask API Test", () => {
    it("Should update the task with the specified ID for the user", async () => {
      const taskIdToUpdate = "1";
      const updatedTask = {
        todo: "Updated Task Title",
      };

      const response = await request(app)
        .put(`/tasks/${taskIdToUpdate}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedTask);

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body.message).toBe("task updated");
      expect(response.body.todo).toBe(updatedTask.todo);
      console.log(response.body);
    });
  });
  // Test for delete API
  describe("updateTask API Test", () => {
    it("Should delete the task with the specified ID for the user", async () => {
      const taskIdToDelete = "1";
      const userIdToDelete = "2";

      const response = await request(app)
        .delete(`/tasks/${taskIdToDelete}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body.message).toBe("task deleted");
      const deleteTask = await TaskModel.deleteTask(
        taskIdToDelete,
        userIdToDelete
      );
      expect(deleteTask).toBe(-1);
      console.log(tasks);
    });
  });
});
