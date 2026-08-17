import type { GameScore } from "../types";

const GAME_SCORES_KEY = "wheres-waldo-game-scores";

export const getGameScores = (): GameScore[] => {
  const raw = localStorage.getItem(GAME_SCORES_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(GAME_SCORES_KEY);
    return [];
  }
};

export const addGameScore = (score: GameScore) => {
  let scores = getGameScores();
  const scoreExists = scores.find((old) => old.id === score.id);

  if (scoreExists) {
    scores = scores.map((old) =>
      old.id === score.id && old.time > score.time
        ? { ...old, time: score.time }
        : old,
    );
  } else {
    scores.push(score);
  }
  localStorage.setItem(GAME_SCORES_KEY, JSON.stringify(scores));
};

export const clearGameScores = () => {
  localStorage.removeItem(GAME_SCORES_KEY);
};
