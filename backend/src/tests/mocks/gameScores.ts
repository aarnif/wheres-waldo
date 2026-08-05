import { mockGames } from "./games.ts";
import { mockUsers } from "./users.ts";

export const mockGameScores = [
  { userId: mockUsers[0].id, gameId: mockGames[0].id, time: 45000 },
  { userId: mockUsers[1].id, gameId: mockGames[0].id, time: 60000 },
  { userId: mockUsers[2].id, gameId: mockGames[0].id, time: 75000 },
];
