import Character from "../models/Character.js";
import characters from "../data/characters.js";

import Game from "../models/Game.js";
import games from "../data/games.js";

import User from "../models/User.js";

import { test, beforeEach, after, afterEach } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

beforeEach(async () => {
  await Character.deleteMany({});
  await Game.deleteMany({});
  await User.deleteMany({});

  for (const character of characters) {
    const characterObject = new Character(character);
    await characterObject.save();
  }

  for (const game of games) {
    const gameObject = new Game(game);
    await gameObject.save();
  }
});

afterEach(async () => {
  await User.deleteMany({});
});

test("games are returned as json", async () => {
  await api
    .get("/api/games")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all the games are found", async () => {
  const response = await api.get("/api/games");
  assert.strictEqual(response.body.length, games.length);
});

test("game titled 'Ski-Resort' has four characters", async () => {
  const response = await api.get("/api/games");
  const skiResort = response.body.find((game) => game.title === "Ski-Resort");
  assert.strictEqual(skiResort.characters.length, 4);
});

after(async () => {
  await mongoose.connection.close();
});
