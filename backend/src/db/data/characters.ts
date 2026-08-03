import type { characters as charactersTable } from "../schema.ts";

type Character = typeof charactersTable.$inferInsert;

export const characters: Character[] = [
  {
    name: "Waldo",
    displayName: "Waldo",
    image: "waldo.png",
  },
  {
    name: "Wenda",
    displayName: "Wenda",
    image: "wenda.png",
  },
  {
    name: "Odlaw",
    displayName: "Odlaw",
    image: "odlaw.png",
  },
  {
    name: "Wizard Whitebeard",
    displayName: "Wizard",
    image: "wizard-whitebeard.png",
  },
];

export default characters;
