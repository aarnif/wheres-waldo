import config from "./utils/config.js";
import Character from "./models/Character.js";
import Game from "./models/Game.js";

import mongoose from "mongoose";

const games = [];
const characters = [];

const createCharacter = async (index, name, image, cordinates, isFound) => {
  const character = new Character({
    name: name,
    image: image,
    cordinates: cordinates,
    isFound: isFound,
  });
  await character.save();
  characters[index] = character;
  console.log(`Created character: ${character}`);
};

const createGame = async (index, title, image, characters, scores) => {
  const game = new Game({
    title: title,
    image: image,
    characters: characters,
    leaderboard: scores,
  });
  await game.save();
  games[index] = game;
  console.log(`Created game: ${game}`);
};

const createCharacters = async () => {
  await Promise.all([
    createCharacter(
      0,
      "Waldo",
      "waldo.png",
      {
        a: { x: 1015, y: 1195 },
        b: { x: 1045, y: 1195 },
        c: { x: 1045, y: 1240 },
        d: { x: 1015, y: 1240 },
      },
      false
    ),
    createCharacter(
      1,
      "Odlaw",
      "odlaw.png",
      {
        a: { x: 160, y: 1300 },
        b: { x: 195, y: 1300 },
        c: { x: 195, y: 1380 },
        d: { x: 160, y: 1380 },
      },
      false
    ),
    createCharacter(
      2,
      "Wizard Whitebeard",
      "wizard-whitebeard.png",
      {
        a: { x: 1960, y: 1100 },
        b: { x: 2000, y: 1100 },
        c: { x: 2000, y: 1300 },
        d: { x: 1960, y: 1300 },
      },
      false
    ),
  ]);
};

const createGames = async () => {
  await createGame(0, "Moon Colony", "moon-colony.png", characters);
};

// Set up mongoose connection
mongoose.set("strictQuery", false);

const main = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to database");

    const connection = mongoose.connection;
    await connection.db.dropDatabase();
    console.log(`${connection.db.databaseName} database dropped.`);

    await createCharacters();
    await createGames();

    console.log("Closing database connection...");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error in main execution:", error);
  }
};

main();
