import helpers from "../utils/helpers.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  characters: [
    {
      character: { type: Schema.Types.ObjectId, ref: "Character" },
      coordinates: {
        a: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
        b: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
        c: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
        d: {
          x: { type: Number, required: true },
          y: { type: Number, required: true },
        },
      },
      isFound: { type: Boolean, required: true, default: false },
    },
  ],

  leaderboard: [
    {
      username: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});

gameSchema.virtual("url").get(function () {
  // Don't use an arrow function because of this-object
  return `/api/games/${this._id}`;
});

gameSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    returnedObject.characters.forEach((character) => {
      character.id = character._id.toString();
      delete character._id;
    });
    returnedObject.leaderboard = returnedObject.leaderboard
      .sort((a, b) => a.time - b.time)
      .map((score) => {
        score.id = score._id.toString();
        delete score._id;
        score.time = helpers.formatTime(parseInt(score.time));

        return score;
      });
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
