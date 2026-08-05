import { beforeEach, after, describe, test } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app.ts";
import { emptyDatabase, populateDatabase } from "../db/populateDb.ts";
import { db } from "../db/index.ts";
import { mockUsers } from "./mocks/users.ts";

const api = supertest(app);

beforeEach(async () => {
  await emptyDatabase();
  await populateDatabase();
});

after(async () => {
  await db.$client.end();
});

describe("POST /api/users", () => {
  test("returns 201 with JSON content type", async () => {
    await api
      .post("/api/users")
      .send({
        username: "player1",
        password: "password",
        confirmPassword: "password",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("returns created user with correct properties", async () => {
    const expectedUser = mockUsers[0];
    const response = await api.post("/api/users").send({
      username: "player1",
      password: "password",
      confirmPassword: "password",
    });
    const user = response.body;

    assert.ok(user, "expected user not found in response");
    assert.strictEqual(user.id, expectedUser.id);
    assert.strictEqual(user.username, expectedUser.username);
    assert.strictEqual(user.passwordHash, undefined);
  });

  test("returns 400 for too short username", async () => {
    const response = await api.post("/api/users").send({
      username: "pl",
      password: "password",
      confirmPassword: "password",
    });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(
      response.body.errors[0].message.includes(
        "Username must be at least 3 characters long",
      ),
    );
  });

  test("returns 400 for too short password", async () => {
    const response = await api.post("/api/users").send({
      username: "player1",
      password: "pass",
      confirmPassword: "pass",
    });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(
      response.body.errors[0].message.includes(
        "Password must be at least 6 characters long",
      ),
    );
  });

  test("returns 400 for non-matching passwords", async () => {
    const response = await api.post("/api/users").send({
      username: "player1",
      password: "password",
      confirmPassword: "differentpassword",
    });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(
      response.body.errors[0].message.includes("Passwords do not match"),
    );
  });

  test("returns 409 for existing username", async () => {
    await api.post("/api/users").send({
      username: "player1",
      password: "password",
      confirmPassword: "password",
    });
    const response = await api.post("/api/users").send({
      username: "player1",
      password: "password",
      confirmPassword: "password",
    });

    assert.strictEqual(response.status, 409);
    assert.deepStrictEqual(response.body, { error: "Username already exists" });
  });
});

describe("POST /api/users/login", () => {
  test("returns 200 with JSON content type", async () => {
    await api
      .post("/api/users/login")
      .send({ username: "test", password: "password" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns token", async () => {
    const response = await api
      .post("/api/users/login")
      .send({ username: "test", password: "password" });

    assert.ok(response.body.token, "token not found in response");
  });

  test("returns 400 for missing username", async () => {
    const response = await api
      .post("/api/users/login")
      .send({ password: "password" });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(response.body.errors[0].message.includes("Username required"));
  });

  test("returns 400 for missing password", async () => {
    const response = await api
      .post("/api/users/login")
      .send({ username: "test" });

    assert.strictEqual(response.status, 400);
    assert.ok(response.body.errors.length > 0);
    assert.ok(response.body.errors[0].message.includes("Password required"));
  });

  test("returns 400 for non-existing username", async () => {
    const response = await api
      .post("/api/users/login")
      .send({ username: "nonexistent", password: "password" });

    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, {
      error: "Invalid username or password",
    });
  });

  test("returns 400 for incorrect password", async () => {
    const response = await api
      .post("/api/users/login")
      .send({ username: "test", password: "wrongpassword" });

    assert.strictEqual(response.status, 400);
    assert.deepStrictEqual(response.body, {
      error: "Invalid username or password",
    });
  });
});
