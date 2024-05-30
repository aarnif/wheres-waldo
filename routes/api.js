import express from "express";
import apiController from "../controllers/ApiController.js";

const route = express.Router();

route.get("/", apiController.index);

route.get("/games", apiController.getAllGames);

route.get("/games/:gameId", apiController.getGameById);

route.get("/games/:gameId/image", apiController.getGameImage);

route.get("/games/:gameId/characters", apiController.getAllGameCharacters);

route.get(
  "/games/:gameId/characters/:characterId",
  apiController.getCharacterById
);

route.get(
  "/games/:gameId/characters/:characterId/image",
  apiController.getCharacterImage
);

route.get("/users", apiController.getAllUsers);

route.get("/users/:userId", apiController.getUserById);

route.post("/users", apiController.createUser);

route.post("/login", apiController.loginUser);

export default route;
