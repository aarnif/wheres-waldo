import mongoose from "mongoose";

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

characterSchema.virtual("url").get(function () {
  // Don't use an arrow function because of this-object
  return `/api/games/:gameId/characters/${this._id}`;
});

characterSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Character = mongoose.model("Character", characterSchema);

export default Character;
