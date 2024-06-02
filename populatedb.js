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
  });
  await character.save();
  characters[index] = character;
  console.log(`Created character: ${character}`);
};

const createGame = async (
  index,
  title,
  difficulty,
  image,
  characters,
  colorTheme,
  scores = []
) => {
  const gameCharacters = await Character.find({
    name: { $in: characters.map((character) => character.name) },
  }).exec();

  const updatedGameCharacters = gameCharacters.map((character) => ({
    name: character.name,
    image: character.image,
    coordinates: characters.find(
      (gameCharacter) => gameCharacter.name === character.name
    ).coordinates,
    isFound: false,
  }));

  console.log("Add Game characters:", updatedGameCharacters);

  const game = new Game({
    title: title,
    difficulty: difficulty,
    image: image,
    characters: updatedGameCharacters,
    colorTheme: colorTheme,
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
      "waldo.png"
      // {
      //   a: { x: 0.4, y: 0.615 },
      //   b: { x: 0.41, y: 0.615 },
      //   c: { x: 0.41, y: 0.65 },
      //   d: { x: 0.4, y: 0.65 },
      // },
      // false
    ),
    createCharacter(
      1,
      "Odlaw",
      "odlaw.png"
      // {
      //   a: { x: 0.065, y: 0.68 },
      //   b: { x: 0.075, y: 0.68 },
      //   c: { x: 0.075, y: 0.71 },
      //   d: { x: 0.065, y: 0.71 },
      // },
      // false
    ),
    createCharacter(
      2,
      "Wizard Whitebeard",
      "wizard-whitebeard.png"
      // {
      //   a: { x: 0.775, y: 0.565 },
      //   b: { x: 0.785, y: 0.565 },
      //   c: { x: 0.785, y: 0.605 },
      //   d: { x: 0.775, y: 0.605 },
      // },
      // false
    ),
  ]);
};

const createGames = async () => {
  // The color themes are based on the Tailwind CSS color palette
  await createGame(
    0,
    "Beach",
    "easy",
    "beach.jpg",
    [
      {
        name: "Waldo",
        coordinates: {
          a: { x: 0.612, y: 0.362 },
          b: { x: 0.627, y: 0.362 },
          c: { x: 0.627, y: 0.414 },
          d: { x: 0.612, y: 0.414 },
        },
      },
      {
        name: "Odlaw",
        coordinates: {
          a: { x: 0.103, y: 0.346 },
          b: { x: 0.113, y: 0.346 },
          c: { x: 0.113, y: 0.389 },
          d: { x: 0.103, y: 0.389 },
        },
      },
      {
        name: "Wizard Whitebeard",
        coordinates: {
          a: { x: 0.264, y: 0.341 },
          b: { x: 0.283, y: 0.341 },
          c: { x: 0.283, y: 0.386 },
          d: { x: 0.264, y: 0.386 },
        },
      },
    ],
    {
      body: "#a78bfa", // purple-400
      gameCardBackground: "#8b5cf6", // purple-500
      gameCard: "#a78bfa", // purple-400
      gameCardHover: "#7c3aed", // purple-600
      gameIcons: "#a78bfa", // purple-400
      gameCanvas: "#8b5cf6", // purple-500
      gameModal: "#8b5cf6", // purple-500
      gameButton: "#7c3aed", // purple-600
      gameButtonHover: "#6d28d9", // purple-700
      gameHeader: "#8b5cf6", // purple-500
    }
  );
  await createGame(
    1,
    "Moon Colony",
    "medium",
    "moon-colony.png",
    [
      {
        name: "Waldo",
        coordinates: {
          a: { x: 0.4, y: 0.615 },
          b: { x: 0.41, y: 0.615 },
          c: { x: 0.41, y: 0.65 },
          d: { x: 0.4, y: 0.65 },
        },
      },
      {
        name: "Odlaw",
        coordinates: {
          a: { x: 0.065, y: 0.68 },
          b: { x: 0.075, y: 0.68 },
          c: { x: 0.075, y: 0.71 },
          d: { x: 0.065, y: 0.71 },
        },
      },
      {
        name: "Wizard Whitebeard",
        coordinates: {
          a: { x: 0.775, y: 0.565 },
          b: { x: 0.785, y: 0.565 },
          c: { x: 0.785, y: 0.605 },
          d: { x: 0.775, y: 0.605 },
        },
      },
    ],
    {
      body: "#f87171", // red-400
      gameCardBackground: "#ef4444", // red-500
      gameCard: "#f87171", // red-400
      gameCardHover: "#dc2626", // red-600
      gameIcons: "#f87171", // red-400
      gameCanvas: "#ef4444", // red-500
      gameModal: "#ef4444", // red-500
      gameButton: "#dc2626", // red-600
      gameButtonHover: "#b91c1c", // red-700
      gameHeader: "#ef4444", // red-500
    }
  );
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
