import config from "../config.js";

import User from "./models/User.js";
import Character from "./models/Character.js";
import Game from "./models/Game.js";

import users from "./data/users.js";
import characters from "./data/characters.js";
import games from "./data/games.js";

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10; // Number of rounds to use in bcrypt hashing

const createUser = async (userData) => {
  const user = new User({
    username: userData.username,
    passwordHash: await bcrypt.hash(userData.password, saltRounds),
  });
  await user.save();
  console.log(`Created user: ${user.username}`);
};

const createCharacter = async (characterData) => {
  const character = new Character(characterData);
  await character.save();
  console.log(`Created character: ${character.name}`);
};

const createGame = async (gameData) => {
  const game = new Game(gameData);
  await game.save();
  console.log(`Created game: ${game.title}`);
};

const createUsers = async () => {
  for (const userData of users) {
    await createUser(userData);
  }
};

const createCharacters = async () => {
  for (const characterData of characters) {
    await createCharacter(characterData);
  }
};

const createGames = async () => {
  for (const gameData of games) {
    await createGame(gameData);
  }
};

mongoose.set("strictQuery", false);

const main = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to database");

    const connection = mongoose.connection;
    await connection.db.dropDatabase();
    console.log(`${connection.db.databaseName} database dropped.`);

    await createUsers();
    await createCharacters();
    await createGames();

    console.log("Closing database connection...");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error in main execution:", error);
  }
};

main();
