import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  image: { type: String, required: true },
  characters: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
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

  colorTheme: {
    body: { type: String, required: true },
    gameCardBackground: { type: String, required: true },
    gameCard: { type: String, required: true },
    gameCardHover: { type: String, required: true },
    gameIcons: { type: String, required: true },
    gameCanvas: { type: String, required: true },
    gameModal: { type: String, required: true },
    gameButton: { type: String, required: true },
    gameButtonHover: { type: String, required: true },
    gameHeader: { type: String, required: true },
  },

  leaderboard: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      score: { type: String, required: true },
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
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
