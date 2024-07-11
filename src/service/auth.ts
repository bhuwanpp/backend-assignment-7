import { sign } from "jsonwebtoken";
import { User } from "../interfaces/user";
import { getUserByEmail } from "./user";
import bcript from "bcrypt";
import config from "../config";
import bcrypt from "bcrypt";
import * as UserService from "../service/user";
import NotFoundError from "../error/NotFoundError";

/**
 * Signs up a new user by hashing their password and creating a user record.
 * @param {User} user - The user object containing user information including password.
 */
export async function signup(user: User) {
  const password = await bcrypt.hash(user.password, 10);
  const data = await UserService.createUser({ ...user, password });
  return data;
}

/**
 * Logs in a user by verifying email and password, and generates access and refresh tokens.
 * @param {Pick<User, "email" | "password">} body - Object containing user's email and password.
 */
export async function login(body: Pick<User, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    throw new NotFoundError("Invalid username or password");
  }
  const isValidPassword = await bcript.compare(
    body.password,
    existingUser.password
  );
  if (!isValidPassword) {
    throw new NotFoundError("Invalid username or password");
  }
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
  };
  const accessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.acccessTokenExpiraryMS,
  });
  const refresthToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiraryMS,
  });
  return {
    accessToken,
    refresthToken,
  };
}
