import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import gamesRouter from "./routes/games.ts";
import usersRouter from "./routes/users.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/images/games",
  express.static(path.join(__dirname, "../assets/images/games")),
);
app.use(
  "/images/characters",
  express.static(path.join(__dirname, "../assets/images/characters")),
);

app.use("/api/games", gamesRouter);
app.use("/api/users", usersRouter);

app.get("/ping", (_req, res) => {
  res.send("pong");
});

export default app;
