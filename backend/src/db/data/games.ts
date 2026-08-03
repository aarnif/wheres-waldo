import type { games as gamesTable } from "../schema.ts";

type Game = typeof gamesTable.$inferInsert;

export const games: Game[] = [
  {
    title: "Ski-Resort",
    level: 1,
    difficulty: "easy",
    description:
      "Snow crunches underfoot as skiers and snowboarders carve down the mountain past pine trees and a creaking chairlift. Somewhere in the wintery chaos, Waldo, Wenda, Odlaw, and Wizard Whitebeard are bundled up and hiding in plain sight.",
    image: "ski-resort.jpeg",
    width: 5120,
    height: 2880,
  },

  {
    title: "Athletics",
    level: 2,
    difficulty: "easy",
    description:
      "The stadium hums with runners rounding the track, jumpers mid-flight, and throwers unleashing their best. Waldo, Wenda, Odlaw, and Wizard Whitebeard have slipped into the crowd of athletes and spectators.",
    image: "athletics.jpg",
    width: 3000,
    height: 1899,
  },

  {
    title: "Beach",
    level: 3,
    difficulty: "medium",
    description:
      "Sunbathers, swimmers, and beachgoers pack the shore from the boardwalk to the water's edge, with sailboats drifting just offshore. Waldo, Wenda, Odlaw, and Wizard Whitebeard are somewhere in the sun-soaked crowd.",
    image: "beach.jpg",
    width: 3000,
    height: 1926,
  },

  {
    title: "Space",
    level: 4,
    difficulty: "medium",
    description:
      "Comets streak across the sky above a cluster of domed moon colonies buzzing with astronauts, aliens, and robots. Waldo, Wenda, Odlaw, and Wizard Whitebeard are tucked away somewhere among the lunar crowds.",
    image: "space.png",
    width: 3000,
    height: 1975,
  },

  {
    title: "Hollywood",
    level: 5,
    difficulty: "medium",
    description:
      "Camera flashes go off as limousines pull up to the red carpet, a giant ape statue looming over the star-studded crowd. Waldo, Wenda, Odlaw, and Wizard Whitebeard are mixed in among the guests and onlookers.",
    image: "hollywood.jpeg",
    width: 5120,
    height: 2880,
  },

  {
    title: "Fruit-World",
    level: 6,
    difficulty: "hard",
    description:
      "Hills built from giant apples, oranges, and pineapples swarm with fruit-shaped characters amid small explosions of chaos. Waldo, Wenda, Odlaw, and Wizard Whitebeard are hiding somewhere in the fruity mayhem.",
    image: "fruit-world.jpeg",
    width: 5120,
    height: 2880,
  },
];

export default games;
