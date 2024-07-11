import { ROLE } from "../enums/role";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: ROLE;
}

export interface GetUserQuery {
  q?: string;
}
