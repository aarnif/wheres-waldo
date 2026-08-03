import type { gameCharacters as gameCharactersTable } from "../schema.ts";

type GameCharacter = {
  game: string;
  character: string;
} & Pick<
  typeof gameCharactersTable.$inferInsert,
  "x" | "y" | "width" | "height"
>;

export const gameCharacters: GameCharacter[] = [
  {
    game: "Ski-Resort",
    character: "Waldo",
    x: 0.839,
    y: 0.738,
    width: 0.038,
    height: 0.069,
  },
  {
    game: "Ski-Resort",
    character: "Wenda",
    x: 0.483,
    y: 0.391,
    width: 0.013,
    height: 0.045,
  },
  {
    game: "Ski-Resort",
    character: "Odlaw",
    x: 0.31,
    y: 0.643,
    width: 0.013,
    height: 0.035,
  },
  {
    game: "Ski-Resort",
    character: "Wizard Whitebeard",
    x: 0.062,
    y: 0.767,
    width: 0.026,
    height: 0.049,
  },

  {
    game: "Athletics",
    character: "Waldo",
    x: 0.269,
    y: 0.32,
    width: 0.023,
    height: 0.047,
  },
  {
    game: "Athletics",
    character: "Wenda",
    x: 0.244,
    y: 0.708,
    width: 0.015,
    height: 0.037,
  },
  {
    game: "Athletics",
    character: "Odlaw",
    x: 0.591,
    y: 0.629,
    width: 0.017,
    height: 0.037,
  },
  {
    game: "Athletics",
    character: "Wizard Whitebeard",
    x: 0.605,
    y: 0.842,
    width: 0.015,
    height: 0.074,
  },

  {
    game: "Beach",
    character: "Waldo",
    x: 0.612,
    y: 0.362,
    width: 0.015,
    height: 0.052,
  },
  {
    game: "Beach",
    character: "Wenda",
    x: 0.767,
    y: 0.398,
    width: 0.011,
    height: 0.025,
  },
  {
    game: "Beach",
    character: "Odlaw",
    x: 0.103,
    y: 0.346,
    width: 0.01,
    height: 0.043,
  },
  {
    game: "Beach",
    character: "Wizard Whitebeard",
    x: 0.264,
    y: 0.341,
    width: 0.019,
    height: 0.045,
  },

  {
    game: "Space",
    character: "Waldo",
    x: 0.4,
    y: 0.615,
    width: 0.01,
    height: 0.035,
  },
  {
    game: "Space",
    character: "Wenda",
    x: 0.289,
    y: 0.509,
    width: 0.01,
    height: 0.032,
  },
  {
    game: "Space",
    character: "Odlaw",
    x: 0.065,
    y: 0.68,
    width: 0.01,
    height: 0.03,
  },
  {
    game: "Space",
    character: "Wizard Whitebeard",
    x: 0.775,
    y: 0.565,
    width: 0.01,
    height: 0.04,
  },

  {
    game: "Hollywood",
    character: "Waldo",
    x: 0.698,
    y: 0.412,
    width: 0.012,
    height: 0.031,
  },
  {
    game: "Hollywood",
    character: "Wenda",
    x: 0.587,
    y: 0.687,
    width: 0.009,
    height: 0.027,
  },
  {
    game: "Hollywood",
    character: "Odlaw",
    x: 0.55,
    y: 0.83,
    width: 0.01,
    height: 0.024,
  },
  {
    game: "Hollywood",
    character: "Wizard Whitebeard",
    x: 0.685,
    y: 0.689,
    width: 0.017,
    height: 0.036,
  },

  {
    game: "Fruit-World",
    character: "Waldo",
    x: 0.886,
    y: 0.681,
    width: 0.012,
    height: 0.02,
  },
  {
    game: "Fruit-World",
    character: "Wenda",
    x: 0.129,
    y: 0.891,
    width: 0.009,
    height: 0.019,
  },
  {
    game: "Fruit-World",
    character: "Odlaw",
    x: 0.656,
    y: 0.563,
    width: 0.009,
    height: 0.021,
  },
  {
    game: "Fruit-World",
    character: "Wizard Whitebeard",
    x: 0.245,
    y: 0.476,
    width: 0.011,
    height: 0.028,
  },
];

export default gameCharacters;
