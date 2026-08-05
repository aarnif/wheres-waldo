import express from "express";
import { eq, asc } from "drizzle-orm";
import { db } from "../db/index.ts";
import { games, gameScores } from "../db/schema.ts";

const route = express.Router();

route.get("/", async (_req, res) => {
  const allGames = await db.query.games.findMany({
    columns: {
      id: true,
      title: true,
      level: true,
      difficulty: true,
      image: true,
      width: true,
      height: true,
    },
  });

  res.json(allGames);
});

route.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid game id" });
  }

  const game = await db.query.games.findFirst({
    where: eq(games.id, id),
    with: {
      characters: {
        columns: {
          id: true,
          x: true,
          y: true,
          width: true,
          height: true,
        },
        with: {
          character: {
            columns: {
              name: true,
              displayName: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  return res.json(game);
});

route.get("/:id/scores", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid game id" });
  }

  const game = await db.query.games.findFirst({
    where: eq(games.id, id),
  });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const leaderboard = await db.query.gameScores.findMany({
    where: eq(gameScores.gameId, id),
    orderBy: asc(gameScores.time),
    columns: {
      id: true,
      time: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          username: true,
        },
      },
    },
  });

  return res.json(leaderboard);
});

export default route;
