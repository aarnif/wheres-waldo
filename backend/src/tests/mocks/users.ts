import bcrypt from "bcrypt";

export const mockUsers = [
  { id: 2, username: "player1", passwordHash: bcrypt.hashSync("password", 10) },
  { id: 3, username: "player2", passwordHash: bcrypt.hashSync("password", 10) },
  { id: 4, username: "player3", passwordHash: bcrypt.hashSync("password", 10) },
];
