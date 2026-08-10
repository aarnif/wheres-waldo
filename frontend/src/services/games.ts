import { BASE_URL } from "../../config";
import type { Game } from "../types";

export const getGames = async (): Promise<Game[]> => {
  const response = await fetch(`${BASE_URL}/api/games`);
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
};
