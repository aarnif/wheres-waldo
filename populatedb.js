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
  });
  await user.save();
  users[index] = user;
  console.log(`Created user: ${user}`);
};

const createCharacter = async (index, name, image) => {
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
      gameModal: "#7c3aed", // purple-600
      gameButton: "#8b5cf6", // purple-500
      gameButtonHover: "#6d28d9", // purple-700
      gameHeader: "#8b5cf6", // purple-500
      gameMessageBox: "#a78bfa", // purple-400
      goBackButtonHover: "#d8b4fe", // purple-300
      dropDownMenu: "#8b5cf6", // purple-500
      dropDownMenuItem: "#8b5cf6", // purple-500
      dropDownMenuItemHover: "#6d28d9", // purple-700
    }
  );
  await createGame(
    1,
    "Space",
    "medium",
    "space.png",
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
      gameModal: "#dc2626", // red-600
      gameButton: "#ef4444", // red-500
      gameButtonHover: "#b91c1c", // red-700
      gameHeader: "#ef4444", // red-500
      gameMessageBox: "#f87171", // red-400
      goBackButtonHover: "#fca5a5", // red-300
      dropDownMenu: "#ef4444", // red-500
      dropDownMenuItem: "#ef4444", // red-500
      dropDownMenuItemHover: "#b91c1c", // red-700
    }
  );
  await createGame(
    0,
    "Ski-Resort",
    "easy",
    "ski-resort.jpeg",
    [
      {
        name: "Waldo",
        coordinates: {
          a: { x: 0.839, y: 0.738 },
          b: { x: 0.877, y: 0.738 },
          c: { x: 0.877, y: 0.807 },
          d: { x: 0.839, y: 0.807 },
        },
      },
      {
        name: "Odlaw",
        coordinates: {
          a: { x: 0.31, y: 0.643 },
          b: { x: 0.323, y: 0.643 },
          c: { x: 0.323, y: 0.678 },
          d: { x: 0.31, y: 0.678 },
        },
      },
      {
        name: "Wizard Whitebeard",
        coordinates: {
          a: { x: 0.062, y: 0.767 },
          b: { x: 0.088, y: 0.767 },
          c: { x: 0.088, y: 0.816 },
          d: { x: 0.062, y: 0.816 },
        },
      },
    ],
    {
      body: "#60a5fa", // blue-400
      gameCardBackground: "#3b82f6", // blue-500
      gameCard: "#60a5fa", // blue-400
      gameCardHover: "#2563eb", // blue-600
      gameIcons: "#60a5fa", // blue-400
      gameCanvas: "#3b82f6", // blue-500
      gameModal: "#2563eb", // blue-600
      gameButton: "#3b82f6", // blue-500
      gameButtonHover: "#1d4ed8", // blue-700
      gameHeader: "#3b82f6", // blue-500
      gameMessageBox: "#60a5fa", // blue-400
      goBackButtonHover: "#93c5fd", // blue-300
      dropDownMenu: "#3b82f6", // blue-500
      dropDownMenuItem: "#3b82f6", // blue-500
      dropDownMenuItemHover: "#1d4ed8", // blue-700
    }
  );
  await createGame(
    0,
    "Hollywood",
    "medium",
    "hollywood.jpeg",
    [
      {
        name: "Waldo",
        coordinates: {
          a: { x: 0.698, y: 0.412 },
          b: { x: 0.71, y: 0.412 },
          c: { x: 0.71, y: 0.443 },
          d: { x: 0.698, y: 0.443 },
        },
      },
      {
        name: "Odlaw",
        coordinates: {
          a: { x: 0.55, y: 0.83 },
          b: { x: 0.56, y: 0.83 },
          c: { x: 0.56, y: 0.854 },
          d: { x: 0.55, y: 0.854 },
        },
      },
      {
        name: "Wizard Whitebeard",
        coordinates: {
          a: { x: 0.685, y: 0.689 },
          b: { x: 0.702, y: 0.689 },
          c: { x: 0.702, y: 0.725 },
          d: { x: 0.685, y: 0.725 },
        },
      },
    ],
    {
      body: "#fbbf24", // amber-400
      gameCardBackground: "#f59e0b", // amber-500
      gameCard: "#fbbf24", // amber-400
      gameCardHover: "#d97706", // amber-600
      gameIcons: "#fbbf24", // amber-400
      gameCanvas: "#f59e0b", // amber-500
      gameModal: "#d97706", // amber-600
      gameButton: "#f59e0b", // amber-500
      gameButtonHover: "#b45309", // amber-700
      gameHeader: "#f59e0b", // amber-500
      gameMessageBox: "#fbbf24", // amber-400
      goBackButtonHover: "#fcd34d", // amber-300
      dropDownMenu: "#f59e0b", // amber-500
      dropDownMenuItem: "#f59e0b", // amber-500
      dropDownMenuItemHover: "#b45309", // amber-700
    }
  );
  await createGame(
    0,
    "Fruit-World",
    "medium",
    "fruit-world.jpeg",
    [
      {
        name: "Waldo",
        coordinates: {
          a: { x: 0.886, y: 0.681 },
          b: { x: 0.898, y: 0.681 },
          c: { x: 0.898, y: 0.701 },
          d: { x: 0.886, y: 0.701 },
        },
      },
      {
        name: "Odlaw",
        coordinates: {
          a: { x: 0.656, y: 0.563 },
          b: { x: 0.665, y: 0.563 },
          c: { x: 0.665, y: 0.584 },
          d: { x: 0.656, y: 0.584 },
        },
      },
      {
        name: "Wizard Whitebeard",
        coordinates: {
          a: { x: 0.245, y: 0.476 },
          b: { x: 0.256, y: 0.476 },
          c: { x: 0.256, y: 0.504 },
          d: { x: 0.245, y: 0.504 },
        },
      },
    ],
    {
      body: "#4ade80", // green-400
      gameCardBackground: "#22c55e", // green-500
      gameCard: "#4ade80", // green-400
      gameCardHover: "#16a34a", // green-600
      gameIcons: "#4ade80", // green-400
      gameCanvas: "#22c55e", // green-500
      gameModal: "#16a34a", // green-600
      gameButton: "#22c55e", // green-500
      gameButtonHover: "#15803d", // green-700
      gameHeader: "#22c55e", // green-500
      gameMessageBox: "#4ade80", // green-400
      goBackButtonHover: "#86efac", // green-300
      dropDownMenu: "#22c55e", // green-500
      dropDownMenuItem: "#22c55e", // green-500
      dropDownMenuItemHover: "#15803d", // green-700
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
