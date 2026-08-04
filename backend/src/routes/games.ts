import express from "express";
import { db } from "../db/index.ts";

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

export default route;
