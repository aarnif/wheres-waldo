import bcrypt from "bcrypt";
import type { users as usersTable } from "../schema.ts";

type User = typeof usersTable.$inferInsert;

export const users: User[] = [
  {
    username: "test",
    passwordHash: bcrypt.hashSync("password", 10),
  },
];

export default users;
