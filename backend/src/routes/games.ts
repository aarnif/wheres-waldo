import express from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { games } from "../db/schema.ts";

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

export default route;
