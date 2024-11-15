import Character from "../models/Character.js";
import Game from "../models/Game.js";
import User from "../models/User.js";

import asyncHandler from "express-async-handler";

const resetDatabase = asyncHandler(async (req, res) => {
  //   await Character.deleteMany({});
  //   await Game.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

export default { resetDatabase };
