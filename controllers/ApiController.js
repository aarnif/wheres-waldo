import User from "../models/User.js";
import Game from "../models/Game.js";
import Character from "../models/Character.js"; // You need to import the Character model despite not using it directly in this file;

import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const index = (req, res) => {
  res.send("Welcome to the Wheres Waldo API!\n");
};

const getAllGames = asyncHandler(async (req, res) => {
  const allGames = await Game.find({}).exec();

  res.json(allGames);
});

const getGameById = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate("leaderboard")
    .exec();

  res.json(gameById);
});

const getGameImage = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId).exec();

  res.sendFile(`${gameById.image}`, { root: "./assets/images/games" });
});

const getAllGameCharacters = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate("characters")
    .exec();

  res.json(gameById.characters);
});

const getCharacterById = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate("characters")
    .exec();

  const characterById = gameById.characters.find(
    (character) => character.id == req.params.characterId
  );

  res.json(characterById);
});

const getCharacterImage = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate("characters")
    .exec();

  const characterById = gameById.characters.find(
    (character) => character.id == req.params.characterId
  );

  res.sendFile(`${characterById.image}`, {
    root: "./assets/images/characters",
  });
});

const getGameLeaderboard = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId).exec();

  res.json(gameById.leaderboard);
});

const addScoreToLeaderboard = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId).exec();

  const { username, time } = req.body;

  const findUserFromLeaderboard = gameById.leaderboard.find(
    (user) => user.username === username
  );

  if (findUserFromLeaderboard) {
    if (findUserFromLeaderboard.time < time) {
      res.json(gameById);
    } else {
      const updateLeaderboard = gameById.leaderboard.map((user) =>
        user.username === username ? { ...user, time: time } : user
      );
      gameById.leaderboard = updateLeaderboard;
    }
  } else {
    gameById.leaderboard.push({
      username,
      time,
    });
  }

  const updatedGame = await gameById.save();

  res.json(updatedGame);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("gameScores").exec();

  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const userById = await User.findById(req.params.userId)
    .populate("gameScores")
    .exec();

  res.json(userById);
});

const createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters long");
    error.name = "ValidationError";
    throw error;
  }

  const user = new User({
    username,
    passwordHash: await bcrypt.hash(password, 10),
    gameScores: [],
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

const loginUser = asyncHandler(async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    const error = new Error("invalid username or password!");
    error.name = "LoginError";
    throw error;
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SESSION_SECRET);

  response.status(200).send({ token, username: user.username });
});

export default {
  index,
  getAllGames,
  getGameById,
  getGameImage,
  getAllGameCharacters,
  getCharacterById,
  getCharacterImage,
  getGameLeaderboard,
  addScoreToLeaderboard,
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
};
