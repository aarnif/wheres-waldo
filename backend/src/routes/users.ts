import express from "express";
import { z } from "zod";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { newUserInputSchema, loginInputSchema } from "../validationSchemas.ts";
import { db } from "../db/index.ts";
import { users } from "../db/schema.ts";
import config from "../../config.ts";

const route = express.Router();

route.post("/", async (req, res) => {
  try {
    const { username, password } = newUserInputSchema.parse(req.body);

    const userExists = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (userExists) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await db
      .insert(users)
      .values({ username, passwordHash })
      .returning({ id: users.id, username: users.username });

    return res
      .status(201)
      .json({ id: createdUser[0].id, username: createdUser[0].username });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    return res.status(500).json({ error: "User creation failed" });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { username, password } = loginInputSchema.parse(req.body);

    const userExists = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (
      !userExists ||
      !(await bcrypt.compare(password, userExists.passwordHash))
    ) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const userForToken = { username: userExists.username, id: userExists.id };
    return res.json({ token: jwt.sign(userForToken, config.JWT_SECRET) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    return res.status(500).json({ error: "Login failed" });
  }
});

export default route;
