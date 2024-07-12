import { ROLE } from "../enums/role";
import { User } from "../interfaces/user";

export const users: User[] = [
  {
    userId: "1",
    name: "user1",
    email: "one@gmail.com",
    password: "$2b$10$/.Fh4GGQrIZsZTBtTctgne6Hz9HkHX9NVPrW5fDU/6YbT8A7kP9PC",
    role: ROLE.ADMIN,
  },
  {
    userId: "2",
    name: "user2",
    email: "two@gmail.com",
    password: "$2b$10$/.Fh4GGQrIZsZTBtTctgne6Hz9HkHX9NVPrW5fDU/6YbT8A7kP9PC",
    role: ROLE.USER,
  },
];
