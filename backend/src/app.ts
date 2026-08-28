import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config.ts";
import gamesRouter from "./routes/games.ts";
import usersRouter from "./routes/users.ts";
import testingRouter from "./routes/testing.ts";

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

if (config.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}

app.get("/ping", (_req, res) => {
  res.send("pong");
});

if (config.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");

  app.use(express.static(distPath));

  // Serve index.html so React Router can handle client-side routes.
  // Paths with a file extension fall through so missing assets 404.
  app.get("/*splat", (req, res, next) => {
    if (path.extname(req.path)) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

export default app;
