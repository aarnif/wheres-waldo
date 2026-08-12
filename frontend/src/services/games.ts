import { BASE_URL } from "../../config";
import type { Game, GameDetails } from "../types";

export const getGames = async (): Promise<Game[]> => {
  const response = await fetch(`${BASE_URL}/api/games`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};

export const getGameById = async (id: string): Promise<GameDetails> => {
  const response = await fetch(`${BASE_URL}/api/games/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch game with id ${id}`);
  }
  return response.json();
};
