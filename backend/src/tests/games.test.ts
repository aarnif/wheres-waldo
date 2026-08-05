import { before, after, describe, test, afterEach } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import { eq, inArray } from "drizzle-orm";
import app from "../app.ts";
import { emptyDatabase, populateDatabase } from "../db/populateDb.ts";
import { db } from "../db/index.ts";
import { mockGames } from "./mocks/games.ts";
import { mockGameScores } from "./mocks/gameScores.ts";
import { mockUsers } from "./mocks/users.ts";
import { users, gameScores } from "../db/schema.ts";
import jwt from "jsonwebtoken";
import config from "../../config.ts";

const api = supertest(app);

before(async () => {
  await emptyDatabase();
  await populateDatabase();
});

after(async () => {
  await db.$client.end();
});

describe("GET /api/games", () => {
  test("returns 200 with JSON content type", async () => {
    await api
      .get("/api/games")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns all games", async () => {
    const response = await api.get("/api/games");
    assert.strictEqual(response.body.length, mockGames.length);
  });

  test("returns games with correct properties", async () => {
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
});

describe("GET /api/games/:id", () => {
  test("returns game with correct properties", async () => {
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

  test("returns 400 for invalid game id", async () => {
    const response = await api.get("/api/games/invalid-id");

    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: "Invalid game id" });
  });

  test("returns 404 for non-existing game", async () => {
    const response = await api.get("/api/games/0");

    assert.strictEqual(response.status, 404);
    assert.deepStrictEqual(response.body, { error: "Game not found" });
  });
});

describe("GET /api/games/:id/scores", () => {
  before(async () => {
    await db.insert(users).values(mockUsers);
    await db.insert(gameScores).values(mockGameScores);
  });

  after(async () => {
    await db.delete(gameScores).where(eq(gameScores.gameId, mockGames[0].id));
    const mockUserIdsToDelete = mockUsers.map((user) => user.id);
    await db.delete(users).where(inArray(users.id, mockUserIdsToDelete));
  });

  test("returns all scores for the game", async () => {
    const expectedGame = mockGames[0];
    const response = await api.get(`/api/games/${expectedGame.id}/scores`);

    assert.strictEqual(response.body.length, mockGameScores.length);
  });

  test("returns leaderboard with correct properties", async () => {
    const expectedGame = mockGames[0];
    const expectedScore = mockGameScores[0];
    const expectedUser = mockUsers[0];
    const response = await api.get(`/api/games/${expectedGame.id}/scores`);
    const leaderboard = response.body;

    assert.strictEqual(leaderboard[0].time, expectedScore.time);
    assert.strictEqual(leaderboard[0].user.username, expectedUser.username);
    assert.strictEqual(leaderboard[0].user.passwordHash, undefined);
  });

  test("returns 400 for invalid game id", async () => {
    const response = await api.get("/api/games/invalid-id/scores");

    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: "Invalid game id" });
  });

  test("returns 404 for non-existing game", async () => {
    const response = await api.get("/api/games/0/scores");

    assert.strictEqual(response.status, 404);
    assert.deepStrictEqual(response.body, { error: "Game not found" });
  });
});

describe("POST /api/games/:id/scores", () => {
  const token = jwt.sign({ id: 1, username: "test" }, config.JWT_SECRET);

  afterEach(async () => {
    await db.delete(gameScores).where(eq(gameScores.gameId, mockGames[0].id));
  });

  test("returns 201 and creates a new score", async () => {
    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 30000 });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.time, 30000);
    assert.ok(response.body.id);
  });

  test("returns 200 and updates score when new time is better", async () => {
    await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 30000 });

    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 20000 });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.time, 20000);
  });

  test("returns 200 and keeps existing score when new time is worse", async () => {
    await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 20000 });

    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 30000 });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.time, 20000);
  });

  test("returns 400 for invalid game id", async () => {
    const response = await api
      .post("/api/games/invalid-id/scores")
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 30000 });

    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, { error: "Invalid game id" });
  });

  test("returns 404 for non-existing game", async () => {
    const response = await api
      .post("/api/games/0/scores")
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 30000 });

    assert.strictEqual(response.status, 404);
    assert.deepStrictEqual(response.body, { error: "Game not found" });
  });

  test("returns 400 for missing time", async () => {
    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({});

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(
      response.body.errors[0].message.includes(
        "Invalid input: expected number, received undefined",
      ),
    );
  });

  test("returns 400 for time as string", async () => {
    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: "30000" });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(
      response.body.errors[0].message.includes(
        "Invalid input: expected number, received string",
      ),
    );
  });

  test("returns 400 for negative time", async () => {
    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: -100 });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(
      response.body.errors[0].message.includes(
        "Time must be a positive integer",
      ),
    );
  });

  test("returns 401 when no token is provided", async () => {
    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .send({ time: 30000 });

    assert.strictEqual(response.status, 401);
    assert.deepStrictEqual(response.body, { error: "Not authenticated" });
  });

  test("returns 401 for invalid token", async () => {
    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", "Bearer invalid-token")
      .send({ time: 30000 });

    assert.strictEqual(response.status, 401);
    assert.deepStrictEqual(response.body, { error: "Not authenticated" });
  });

  test("returns only id and time properties", async () => {
    const response = await api
      .post(`/api/games/${mockGames[0].id}/scores`)
      .set("Authorization", `Bearer ${token}`)
      .send({ time: 30000 });

    assert.deepStrictEqual(Object.keys(response.body).sort(), ["id", "time"]);
  });
});
