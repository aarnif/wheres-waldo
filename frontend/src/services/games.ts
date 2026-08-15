import { BASE_URL } from "../../config";
import type { Game, GameDetails, GameScore } from "../types";
import { getToken } from "../helpers/token";

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

export const submitGameScore = async (
  id: string,
  time: number,
): Promise<GameScore> => {
  const response = await fetch(`${BASE_URL}/api/games/${id}/scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ time }),
  });

  const body = await response.json();

  if (!response.ok) {
    let message = "Failed to submit game score";

    if (body.errors) {
      message = body.errors
        .map((error: { message: string }) => error.message)
        .join(", ");
    } else if (body.error) {
      message = body.error;
    }

    throw new Error(message);
  }

  return body;
};
