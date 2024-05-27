import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
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
  },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
