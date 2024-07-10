export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userId: string;
}

export interface GetUserQuery {
  q?: string;
}
