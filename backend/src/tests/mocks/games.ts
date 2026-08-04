import { games } from "../../db/data/games.ts";

export const mockGames = games.map((game, index) => ({
  id: index + 1,
  ...game,
}));
