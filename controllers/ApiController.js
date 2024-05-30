import User from "../models/User.js";
import Game from "../models/Game.js";
import Character from "../models/Character.js"; // You need to import the Character model despite not using it directly in this file

import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

const index = (req, res) => {
  res.send("Welcome to the Wheres Waldo API!\n");
};

const getAllGames = asyncHandler(async (req, res) => {
  const allGames = await Game.find({})
    .populate("characters")
    .populate("leaderboard")
    .exec();

  res.json(allGames);
});

const getGameById = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId)
    .populate("characters")
    .populate("leaderboard")
    .exec();

  res.json(gameById);
});

const getGameImage = asyncHandler(async (req, res) => {
  const gameById = await Game.findById(req.params.gameId).exec();

  res.sendFile(
    `/Users/aarnif/coding/github-repos/odin-wheres-waldo/odin-wheres-waldo-server/assets/images/${gameById.image}`
  );
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

  res.sendFile(
    `/Users/aarnif/coding/github-repos/odin-wheres-waldo/odin-wheres-waldo-server/assets/images/${characterById.image}`
  );
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

export default {
  index,
  getAllGames,
  getGameById,
  getGameImage,
  getAllGameCharacters,
  getCharacterById,
  getCharacterImage,
  getAllUsers,
  getUserById,
  createUser,
};
