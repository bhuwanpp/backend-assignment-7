import { hash } from "bcrypt";
import { GetUserQuery, User } from "../interfaces/user";
import * as UserModel from "../model/user";

/**
 * Creates a new user.
 * @param {User} user - The user object containing user information.
 */
export function createUser(user: User) {
  return UserModel.createUser(user);
}

/**
 * Retrieves users based on the provided query.
 * If no query is provided, retrieves all users.
 * @param {GetUserQuery} query - The query object containing search parameters.
 * @returns {User[]} - Array of users that match the query or all users if no query is provided.
 */
export function getUsers(query: GetUserQuery): User[] {
  return UserModel.getUsers(query);
}

/**
 * Retrieves a user by their email address.
 * @param {string} email - The email address of the user to retrieve.
 * @returns {User | undefined} - The user object if found, undefined otherwise.
 */
export function getUserByEmail(email: string): User | undefined {
  const data = UserModel.getUserByEmail(email);
  return data;
}

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {User | { error: string }} - The user object if found, or an error object if user is not found.
 */
export function getUseerById(id: string): User | { error: string } {
  const data = UserModel.getUseerById(id);
  if (!data) {
    return {
      error: `User with id: ${id} not found`,
    };
  }
  return data;
}
/**
 * Updates an existing user's details.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<User>} updatedUser - The updated user object containing new details.
 */
export async function updateUser(id: string, updatedUser: Partial<User>) {
  const existingUser = UserModel.getUseerById(id);
  if (!existingUser) {
    return {
      error: `User doesnot exist`,
    };
  }

  if (updatedUser.password) {
    updatedUser.password = await hash(updatedUser.password, 10);
  }

  // Update user object with new details
  const updatedUserData: User = {
    ...existingUser,
    ...updatedUser,
  };

  // Call the model function to update user
  const updated = UserModel.updateUser(id, updatedUserData);

  if (!updated) {
    return {
      error: `User ${id} doesnot match `,
    };
  }

  return updated;
}
/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {boolean} - True if user is successfully deleted, false otherwise.
 */
export function deleteUser(id: string): User | undefined | { error: string } {
  const existingUser = UserModel.getUseerById(id);
  if (!existingUser) {
    return {
      error: `User with id: ${id} not found`,
    };
  }

  // Call the model function to delete user
  const deleted = UserModel.deleteUser(id);

  return deleted;
}
