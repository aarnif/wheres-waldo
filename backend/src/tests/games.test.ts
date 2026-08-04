import { before, after, test } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app.ts";
import { emptyDatabase, populateDatabase } from "../db/populateDb.ts";
import { db } from "../db/index.ts";
import { mockGames } from "./mocks/games.ts";

const api = supertest(app);

before(async () => {
  await emptyDatabase();
  await populateDatabase();
});

after(async () => {
  await db.$client.end();
});

test("GET /api/games returns 200 with JSON content type", async () => {
  await api
    .get("/api/games")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("GET /api/games returns all games", async () => {
  const response = await api.get("/api/games");
  assert.strictEqual(response.body.length, mockGames.length);
});

test("GET /api/games returns games with correct properties", async () => {
  const expectedGame = mockGames[0];
  const response = await api.get("/api/games");
  const game = response.body.find(
    (game: { title: string }) => game.title === expectedGame.title,
  );

  assert.ok(game, "expected game not found in response");
  assert.strictEqual(game.id, expectedGame.id);
  assert.strictEqual(game.title, expectedGame.title);
  assert.strictEqual(game.level, expectedGame.level);
  assert.strictEqual(game.difficulty, expectedGame.difficulty);
  assert.strictEqual(game.image, expectedGame.image);
  assert.strictEqual(game.width, expectedGame.width);
  assert.strictEqual(game.height, expectedGame.height);
});

test("GET /api/games/:id returns game with correct properties", async () => {
  const expectedGame = mockGames[0];
  const response = await api.get(`/api/games/${expectedGame.id}`);
  const game = response.body;

  assert.ok(game, "expected game not found in response");
  assert.strictEqual(game.id, expectedGame.id);
  assert.strictEqual(game.title, expectedGame.title);
  assert.strictEqual(game.level, expectedGame.level);
  assert.strictEqual(game.difficulty, expectedGame.difficulty);
  assert.strictEqual(game.description, expectedGame.description);
  assert.strictEqual(game.image, expectedGame.image);
  assert.strictEqual(game.width, expectedGame.width);
  assert.strictEqual(game.height, expectedGame.height);
});

test("GET /api/games/:id returns 400 for invalid game id", async () => {
  const response = await api.get("/api/games/invalid-id");

  assert.strictEqual(response.status, 400);
  assert.deepStrictEqual(response.body, { error: "Invalid game id" });
});

test("GET /api/games/:id returns 404 for non-existing game", async () => {
  const response = await api.get("/api/games/0");

  assert.strictEqual(response.status, 404);
  assert.deepStrictEqual(response.body, { error: "Game not found" });
});
