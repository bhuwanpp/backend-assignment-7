import { ROLE } from "../enums/role";

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: ROLE;
}
export type UserWithoutPassword = Pick<User, 'userId' | 'name' | 'email' | 'role'>;
export interface GetUserQuery {
  q?: string;
}
