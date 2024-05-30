import config from "./utils/config.js";
import User from "./models/User.js";
import Character from "./models/Character.js";
import Game from "./models/Game.js";

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const users = [];
const games = [];
const characters = [];
const saltRounds = 10; // Number of rounds to use in bcrypt hashing

const createUser = async (index, username, password) => {
  const user = new User({
    username: username,
    passwordHash: await bcrypt.hash(password, saltRounds),
    gameScores: [],
  });
  await user.save();
  users[index] = user;
  console.log(`Created user: ${user}`);
};

const createCharacter = async (index, name, image, coordinates, isFound) => {
  const character = new Character({
    name: name,
    image: image,
    coordinates: coordinates,
    isFound: isFound,
  });
  await character.save();
  characters[index] = character;
  console.log(`Created character: ${character}`);
};

const createGame = async (index, title, image, characters, scores = []) => {
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

const createUsers = async () => {
  await Promise.all([createUser(0, "aarnif", "password")]);
};

const createCharacters = async () => {
  await Promise.all([
    createCharacter(
      0,
      "Waldo",
      "waldo.png",
      {
        a: { x: 0.4, y: 0.615 },
        b: { x: 0.41, y: 0.615 },
        c: { x: 0.41, y: 0.65 },
        d: { x: 0.4, y: 0.65 },
      },
      false
    ),
    createCharacter(
      1,
      "Odlaw",
      "odlaw.png",
      {
        a: { x: 0.065, y: 0.68 },
        b: { x: 0.075, y: 0.68 },
        c: { x: 0.075, y: 0.71 },
        d: { x: 0.065, y: 0.71 },
      },
      false
    ),
    createCharacter(
      2,
      "Wizard Whitebeard",
      "wizard-whitebeard.png",
      {
        a: { x: 0.775, y: 0.565 },
        b: { x: 0.785, y: 0.565 },
        c: { x: 0.785, y: 0.605 },
        d: { x: 0.775, y: 0.605 },
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
