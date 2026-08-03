import {
  pgEnum,
  pgTable,
  serial,
  text,
  integer,
  unique,
  real,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  level: integer("level").notNull().unique(),
  difficulty: difficultyEnum("difficulty").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  image: text("image").notNull(),
});

export const gameCharacters = pgTable("game_characters", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  characterId: integer("character_id")
    .notNull()
    .references(() => characters.id),
  x: real("x").notNull(),
  y: real("y").notNull(),
  width: real("width").notNull(),
  height: real("height").notNull(),
});

export const gameScores = pgTable(
  "game_scores",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    gameId: integer("game_id")
      .notNull()
      .references(() => games.id),
    time: integer("time").notNull(),
  },
  (table) => [unique().on(table.userId, table.gameId)],
);

export const usersRelations = relations(users, ({ many }) => ({
  gameScores: many(gameScores),
}));

export const gamesRelations = relations(games, ({ many }) => ({
  characters: many(gameCharacters),
  gameScores: many(gameScores),
}));

export const charactersRelations = relations(characters, ({ many }) => ({
  games: many(gameCharacters),
}));

export const gameCharactersRelations = relations(gameCharacters, ({ one }) => ({
  game: one(games, { fields: [gameCharacters.gameId], references: [games.id] }),
  character: one(characters, {
    fields: [gameCharacters.characterId],
    references: [characters.id],
  }),
}));

export const gameScoresRelations = relations(gameScores, ({ one }) => ({
  user: one(users, { fields: [gameScores.userId], references: [users.id] }),
  game: one(games, { fields: [gameScores.gameId], references: [games.id] }),
}));
