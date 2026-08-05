import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "./index.ts";
import {
  users,
  games,
  characters,
  gameCharacters,
  gameScores,
} from "./schema.ts";
import usersData from "./data/users.ts";
import gamesData from "./data/games.ts";
import charactersData from "./data/characters.ts";
import gameCharactersData from "./data/gameCharacters.ts";

export const emptyDatabase = async () => {
  await db.execute(
    sql`TRUNCATE TABLE ${gameScores}, ${gameCharacters}, ${games}, ${characters}, ${users} RESTART IDENTITY CASCADE`,
  );
};

const createUsers = async () => {
  const createdUsers = await db.insert(users).values(usersData).returning();
  console.log(`✅ Created ${createdUsers.length} users`);
  return createdUsers;
};

const createCharacters = async () => {
  const createdCharacters = await db
    .insert(characters)
    .values(charactersData)
    .returning();
  console.log(`✅ Created ${createdCharacters.length} characters`);
  return createdCharacters;
};

const createGames = async () => {
  const createdGames = await db.insert(games).values(gamesData).returning();
  console.log(`✅ Created ${createdGames.length} games`);
  return createdGames;
};

const createGameCharacters = async (
  createdGames: (typeof games.$inferSelect)[],
  createdCharacters: (typeof characters.$inferSelect)[],
) => {
  const gameIdByTitle = new Map(
    createdGames.map((game) => [game.title, game.id]),
  );
  const characterIdByName = new Map(
    createdCharacters.map((character) => [character.name, character.id]),
  );

  const createdGameCharacters = await db
    .insert(gameCharacters)
    .values(
      gameCharactersData.map(({ game, character, ...coordinates }) => ({
        gameId: gameIdByTitle.get(game)!,
        characterId: characterIdByName.get(character)!,
        ...coordinates,
      })),
    )
    .returning();
  console.log(`✅ Created ${createdGameCharacters.length} game characters`);
};

export const populateDatabase = async () => {
  await createUsers();
  const createdCharacters = await createCharacters();
  const createdGames = await createGames();
  await createGameCharacters(createdGames, createdCharacters);
};

const main = async () => {
  await emptyDatabase();
  await populateDatabase();
  await db.$client.end();
  console.log("Connection closed!");
};

if (process.env.POPULATE_DB === "true") {
  main().catch((error) => {
    console.error("Error during database population:", error);
  });
}
