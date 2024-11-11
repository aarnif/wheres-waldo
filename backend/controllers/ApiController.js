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
  const allGames = await Game.find({})
    .populate({
      path: "characters",
      populate: { path: "character" },
    })
    .exec();

  res.json(allGames);
});

const getGameById = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate({
      path: "characters",
      populate: { path: "character" },
    })
    .exec();

  res.json(gameById);
});

const getGameImage = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId).exec();

  res.sendFile(`${gameById.image}`, { root: "./backend/assets/images/games" });
});

const getAllGameCharacters = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate({
      path: "characters",
      populate: { path: "character" },
    })
    .exec();

  res.json(gameById.characters);
});

const getCharacterById = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate({
      path: "characters",
      populate: { path: "character" },
    })
    .exec();

  const characterById = gameById.characters.find(
    (character) => character.id == req.params.characterId
  );

  res.json(characterById);
});

const getCharacterImage = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate({
      path: "characters",
      populate: { path: "character" },
    })
    .exec();

  const characterById = gameById.characters.find(
    (character) => character.id == req.params.characterId
  );

  res.sendFile(`${characterById.character.image}`, {
    root: "./backend/assets/images/characters",
  });
});

const getGameLeaderboard = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId).exec();

  res.json(gameById.leaderboard);
});

const addScoreToGameAndUser = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId).exec();

  const { username, time } = req.body;

  const findUser = await User.findOne({ username }).exec();

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

      const updateUserPlayedGames = findUser.playedGames.map((game) =>
        game.game === gameById ? { ...game, time: time } : game
      );
    }
  } else {
    gameById.leaderboard.push({
      username,
      time,
    });
    findUser.playedGames.push({ game: gameById, time });
  }

  const updatedGame = await gameById.save();
  const updatedUser = await findUser.save();

  res.json(updatedGame);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
    .populate({
      path: "playedGames",
      populate: { path: "game" },
    })
    .exec();

  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const userById = await User.findById(req.params.userId)
    .populate({
      path: "playedGames",
      populate: { path: "game" },
    })
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

  const user = await User.findOne({ username })
    .populate({
      path: "playedGames",
      populate: { path: "game" },
    })
    .exec();
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

  response.status(200).send({
    token: token,
    username: user.username,
    playedGames: user.playedGames,
  });
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
  addScoreToGameAndUser,
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
};
