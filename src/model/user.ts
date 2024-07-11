import { ROLE } from "../enums/role";
import { GetUserQuery, User } from "../interfaces/user";

// write query in here
const users: User[] = [
  {
    id: "1",
    name: "user1",
    email: "one@gmail.com",
    password: "$2b$10$/.Fh4GGQrIZsZTBtTctgne6Hz9HkHX9NVPrW5fDU/6YbT8A7kP9PC",
    role: ROLE.ADMIN,
  },
  {
    id: "2",
    name: "user2",
    email: "two@gmail.com",
    password: "$2b$10$/.Fh4GGQrIZsZTBtTctgne6Hz9HkHX9NVPrW5fDU/6YbT8A7kP9PC",
    role: ROLE.USER,
  },
];
/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {User | undefined} - The user object if found, undefined otherwise.
 */
export function getUseerById(id: string): User | undefined {
  return users.find(({ id: userId }) => userId === id);
}

/**
 * Creates a new user and adds them to the users array.
 * @param {User} user - The user object to create.
 *  * @returns {number | undefined} - The new length of the users array after adding the user.
 */
export function createUser(user: User): number | undefined {
  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) {
    return;
  }
  return users.push({
    ...user,
    id: `${users.length + 1}`,
    role: ROLE.USER,
  });
}

/**
 * Retrieves users from the users array based on the provided query.
 * If no query is provided, returns all users.
 * @param {GetUserQuery} query - The query object containing search parameters.
 * @returns {User[]} - Array of users that match the query or all users if no query is provided.
 */
export function getUsers(query: GetUserQuery): User[] {
  const { q } = query;
  if (q) {
    return users.filter(({ name }) => name.includes(q));
  }
  return users;
}

/**
 * Retrieves a user by their email address.
 * @param {string} email - The email address of the user to retrieve.
 * @returns {User | undefined} - The user object if found, undefined otherwise.
 */
export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

/**
 * Updates an existing user's details.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<User>} updatedUser - The updated user object containing new details.
 * @returns {User | undefined} - The updated user object if found and updated, undefined otherwise.
 */
export function updateUser(
  id: string,
  updatedUser: Partial<User>
): User | undefined {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...updatedUser,
    };
    return users[index];
  }
  return undefined;
}

/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {User | undefined} - The deleted user object if found and deleted, undefined otherwise.
 */
export function deleteUser(id: string): User | undefined {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    return deletedUser;
  }
  return undefined;
}
