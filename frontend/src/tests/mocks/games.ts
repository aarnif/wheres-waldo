import type { Game, GameDetails, LeaderboardEntry } from "../../types";

const mockUsers = [
  { id: 1, username: "Player1" },
  { id: 2, username: "Player2" },
  { id: 3, username: "Player3" },
];

const mockSkiResortLeaderboard: LeaderboardEntry[] = [
  { id: 1, time: 45, user: mockUsers[0] },
  { id: 2, time: 52, user: mockUsers[1] },
  { id: 3, time: 63, user: mockUsers[2] },
];

export const mockGames: Game[] = [
  {
    id: 1,
    title: "Ski-Resort",
    level: 1,
    difficulty: "easy",
    image: "ski-resort.jpeg",
    width: 5120,
    height: 2880,
    gameScores: mockSkiResortLeaderboard,
  },

  {
    id: 2,
    title: "Athletics",
    level: 2,
    difficulty: "easy",
    image: "athletics.jpg",
    width: 3000,
    height: 1899,
    gameScores: [
      { id: 4, time: 38, user: mockUsers[0] },
      { id: 5, time: 44, user: mockUsers[1] },
    ],
  },

  {
    id: 3,
    title: "Beach",
    level: 3,
    difficulty: "medium",
    image: "beach.jpg",
    width: 3000,
    height: 1926,
    gameScores: [
      { id: 6, time: 78, user: mockUsers[2] },
      { id: 7, time: 92, user: mockUsers[0] },
      { id: 8, time: 105, user: mockUsers[1] },
    ],
  },

  {
    id: 4,
    title: "Space",
    level: 4,
    difficulty: "medium",
    image: "space.png",
    width: 3000,
    height: 1975,
    gameScores: [
      { id: 9, time: 89, user: mockUsers[1] },
      { id: 10, time: 112, user: mockUsers[2] },
    ],
  },

  {
    id: 5,
    title: "Hollywood",
    level: 5,
    difficulty: "medium",
    image: "hollywood.jpeg",
    width: 5120,
    height: 2880,
    gameScores: [
      { id: 11, time: 156, user: mockUsers[0] },
      { id: 12, time: 178, user: mockUsers[2] },
    ],
  },

  {
    id: 6,
    title: "Fruit-World",
    level: 6,
    difficulty: "hard",
    image: "fruit-world.jpeg",
    width: 5120,
    height: 2880,
    gameScores: [
      { id: 13, time: 234, user: mockUsers[2] },
      { id: 14, time: 267, user: mockUsers[0] },
      { id: 15, time: 289, user: mockUsers[1] },
    ],
  },
];

export const mockGameDetails: GameDetails = {
  id: 1,
  title: "Ski-Resort",
  level: 1,
  difficulty: "easy",
  description:
    "Snow crunches underfoot as skiers and snowboarders carve down the mountain past pine trees and a creaking chairlift. Somewhere in the wintery chaos, Waldo, Wenda, Odlaw, and Wizard Whitebeard are bundled up and hiding in plain sight.",
  image: "ski-resort.jpeg",
  width: 5120,
  height: 2880,
  characters: [
    {
      id: 1,
      x: 0.839,
      y: 0.738,
      width: 0.038,
      height: 0.069,
      character: {
        name: "Waldo",
        displayName: "Waldo",
        image: "waldo.png",
      },
    },
    {
      id: 2,
      x: 0.483,
      y: 0.391,
      width: 0.013,
      height: 0.045,
      character: {
        name: "Wenda",
        displayName: "Wenda",
        image: "wenda.png",
      },
    },
    {
      id: 3,
      x: 0.31,
      y: 0.643,
      width: 0.013,
      height: 0.035,
      character: {
        name: "Odlaw",
        displayName: "Odlaw",
        image: "odlaw.png",
      },
    },
    {
      id: 4,
      x: 0.062,
      y: 0.767,
      width: 0.026,
      height: 0.049,
      character: {
        name: "Wizard Whitebeard",
        displayName: "Wizard",
        image: "wizard-whitebeard.png",
      },
    },
  ],
  gameScores: mockSkiResortLeaderboard,
};
