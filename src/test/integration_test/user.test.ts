import bcrypt from "bcrypt";
import expect from "expect";
import express from "express";
import HttpStatusCodes from "http-status-codes";
import { sign } from "jsonwebtoken";
import request from "supertest";
import * as UserModel from "../../../src/model/user";
import config from "../../config";
import { ROLE } from "../../enums/role";
import { UserWithoutPassword } from "../../interfaces/user";
import { users } from "../../mockdata/user";
import router from "../../routes";
import { genericErrorHandler } from "../../middleware/errorHandler";
const generateToken = (payload: UserWithoutPassword) => {
  return sign(payload, config.jwt.secret!, { expiresIn: "1h" });
};
// signup test
describe("User Integration test suite", () => {
  const tokenPayload = {
    userId: "1",
    name: "user1",
    email: "one@gmail.com",
    role: ROLE.ADMIN,
  };
  const token = generateToken(tokenPayload);
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(genericErrorHandler);
  describe("createUser API Test ", () => {
    it("Should create a new user", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .set("Authorization", `Bearer ${token}`)
        .send({
          userId: "3",
          name: "user1 integration",
          email: "three@gmail.com",
          password: "12345678!aA",
          role: ROLE.USER,
        });
      console.log(users);
      expect(response.status).toBe(HttpStatusCodes.OK)
      expect(response.body.message).toBe("user created")
    });
  });
  // login test
  describe("Login Api", () => {
    it("should success if credential is  valid  ", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "one@gmail.com",
        password: "test123",
      });

      expect(response.status).toBe(HttpStatusCodes.OK)
      const accessToken = response.body.accessToken;
      const refreshToken = response.body.refreshToken;
      console.log("Access Token:", accessToken + "refreshToken", refreshToken);
    });
  });
  // refresh token

  // Refresh token test
  describe("Refresh Token API", () => {
    it("should refresh the access token", async () => {
      const refreshToken = generateToken(tokenPayload);
      const response = await request(app)
        .get("/auth/refresh-token")
        .set("Authorization", `Bearer ${refreshToken}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
      const newAccessToken = response.body.accessToken;
      console.log("new accessToken " + newAccessToken);

    });
  });
  //
  // get users

  // Test for getUsers API
  describe("getUsers API Test", async () => {
    it("Should return all users when no query parameter is provided", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body).toEqual(users);
      console.log(response.body);
    });
  });
  // get user by id
  describe("getUserById API Test", async () => {
    it("Should return the user when a valid ID is provided", async () => {
      const validUserId = "2";
      const response = await request(app)
        .get(`/users/${validUserId}`)
        .set("Authorization", `Bearer ${token}`);

      const expectedUser = UserModel.getUserById(validUserId);
      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body).toEqual(expectedUser);
    });
  });
  // update user
  describe("updateUser API Test", async () => {
    it("Should update the user when a valid ID and data are provided", async () => {
      const validUserId = "1";
      const updatedUserData = {
        name: "updated user",
        email: "updated@gmail.com",
        password: "newpassword123",
      };

      const response = await request(app)
        .put(`/users/${validUserId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedUserData);

      expect(response.status).toBe(HttpStatusCodes.OK);
      const expectedUser = UserModel.updateUser(validUserId, updatedUserData);
      expectedUser.password = await bcrypt.hash(updatedUserData.password, 10);
      console.log(expectedUser);
    });
  });
  // delete user id
  describe("deleteUser API Test", () => {
    it("Should delete the user when a valid ID is provided", async () => {
      const validUserId = "2";

      const response = await request(app)
        .delete(`/users/${validUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body.message).toBe(
        `User with id ${validUserId} has been deleted`
      );
      const deletedUser = UserModel.deleteUser(validUserId);
      expect(deletedUser).toBe(undefined);
    });
  });
});
