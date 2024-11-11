import config from "./utils/config.js";

import User from "./models/User.js";
import Character from "./models/Character.js";
import Game from "./models/Game.js";

import users from "./data/users.js";
import characters from "./data/characters.js";
import games from "./data/games.js";

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10; // Number of rounds to use in bcrypt hashing

const createUser = async (username, password) => {
  const user = new User({
    username: username,
    passwordHash: await bcrypt.hash(password, saltRounds),
  });
  await user.save();
  console.log(`Created user: ${user.username}`);
};

const createCharacter = async (_id, name, image) => {
  const character = new Character({
    _id: _id,
    name: name,
    image: image,
  });
  await character.save();
  console.log(`Created character: ${character.name}`);
};

const createGame = async (
  _id,
  title,
  difficulty,
  image,
  characters,
  colorTheme,
  leaderboard
) => {
  const game = new Game({
    _id: _id,
    title: title,
    difficulty: difficulty,
    image: image,
    characters: characters,
    colorTheme: colorTheme,
    leaderboard: leaderboard,
  });
  await game.save();
  console.log(`Created game: ${game.title}`);
};

const createUsers = async () => {
  for (let i = 0; i < users.length; i++) {
    await createUser(users[i].username, users[i].password);
  }
};

const createCharacters = async () => {
  for (let i = 0; i < characters.length; i++) {
    await createCharacter(
      characters[i]._id,
      characters[i].name,
      characters[i].image
    );
  }
};

const createGames = async () => {
  for (let i = 0; i < games.length; i++) {
    await createGame(
      games[i]._id,
      games[i].title,
      games[i].difficulty,
      games[i].image,
      games[i].characters,
      games[i].colorTheme,
      games[i].leaderboard
    );
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
