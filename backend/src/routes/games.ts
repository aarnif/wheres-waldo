import express from "express";
import { z } from "zod";
import { eq, asc, and, gt } from "drizzle-orm";
import { db } from "../db/index.ts";
import { games, gameScores } from "../db/schema.ts";
import { gameScoreInputSchema } from "../validationSchemas.ts";
import { authenticate, type AuthenticatedRequest } from "../middleware/auth.ts";

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
    with: {
      gameScores: {
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
        orderBy: asc(gameScores.time),
      },
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
      gameScores: {
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
        orderBy: asc(gameScores.time),
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

route.post(
  "/:id/scores",
  authenticate,
  async (req: AuthenticatedRequest, res) => {
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

    try {
      const { time } = gameScoreInputSchema.parse(req.body);
      const userId = req.user!.id;

      const existingScore = await db.query.gameScores.findFirst({
        where: and(eq(gameScores.userId, userId), eq(gameScores.gameId, id)),
        columns: {
          id: true,
          time: true,
        },
      });

      if (existingScore) {
        const updatedScore = await db
          .update(gameScores)
          .set({ time })
          .where(
            and(eq(gameScores.id, existingScore.id), gt(gameScores.time, time)),
          )
          .returning({ id: gameScores.id, time: gameScores.time });

        return res.json(updatedScore[0] || existingScore);
      }

      const createdScore = await db
        .insert(gameScores)
        .values({ userId, gameId: id, time })
        .returning({ id: gameScores.id, time: gameScores.time });

      return res.status(201).json(createdScore[0]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues });
      }
      return res.status(500).json({ error: "Score submission failed" });
    }
  },
);

export default route;
