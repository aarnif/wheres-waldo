const games = [
  {
    _id: "66c735869b3ffb61c2978a89",
    title: "Ski-Resort",
    difficulty: "easy",
    description:
      "Hit the slopes and search for your favorite characters in this winter wonderland! Navigate through bustling ski lodges, crowded chairlifts, and snowy mountain peaks. Can you spot Waldo, Wenda, Odlaw, and Wizard Whitebeard among the skiers, snowboarders, and après-ski enthusiasts? Bundle up and race against time to find all four before the last run of the day!",
    image: "ski-resort.jpeg",
    dimensions: {
      width: 5120,
      height: 2880,
    },
    characters: [
      {
        _id: "66cf3939a634f95c9175d880",
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.839, y: 0.738 },
          b: { x: 0.877, y: 0.738 },
          c: { x: 0.877, y: 0.807 },
          d: { x: 0.839, y: 0.807 },
        },
      },
      {
        _id: "66cf3939a634f95c9175d881",
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.483, y: 0.391 },
          b: { x: 0.496, y: 0.391 },
          c: { x: 0.496, y: 0.436 },
          d: { x: 0.483, y: 0.436 },
        },
      },
      {
        _id: "66cf3939a634f95c9175d882",
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.31, y: 0.643 },
          b: { x: 0.323, y: 0.643 },
          c: { x: 0.323, y: 0.678 },
          d: { x: 0.31, y: 0.678 },
        },
      },
      {
        _id: "66cf3939a634f95c9175d883",
        character: "66601f7a66990e4269078fd2",
        coordinates: {
          a: { x: 0.062, y: 0.767 },
          b: { x: 0.088, y: 0.767 },
          c: { x: 0.088, y: 0.816 },
          d: { x: 0.062, y: 0.816 },
        },
      },
    ],
    colorTheme: {
      body: "#60a5fa", // blue-400
      gameCardBackground: "#3b82f6", // blue-500
      gameCard: "#60a5fa", // blue-400
      gameCardHover: "#2563eb", // blue-600
      gameIcons: "#60a5fa", // blue-400
      gameCanvas: "#3b82f6", // blue-500
      gameModal: "#2563eb", // blue-600
      gameButton: "#3b82f6", // blue-500
      gameButtonHover: "#1d4ed8", // blue-700
      gameHeader: "#3b82f6", // blue-500
      gameMessageBox: "#bfdbfe", // blue-200
      goBackButtonHover: "#93c5fd", // blue-300
      dropDownMenu: "#3b82f6", // blue-500
      dropDownMenuItem: "#3b82f6", // blue-500
      dropDownMenuItemHover: "#1d4ed8", // blue-700
    },
    leaderboard: [],
  },

  {
    _id: "66601f7b66990e4269078fe0",
    title: "Beach",
    difficulty: "medium",
    description:
      "Surf's up and the beach is packed! Dive into this sunny seaside adventure where Waldo and friends are hiding among sunbathers, volleyball players, and beach vendors. From crowded boardwalks to busy lifeguard stations, can you locate all four characters before the tide comes in? Grab your sunscreen and start searching—time is ticking like the waves!",
    image: "beach.jpg",
    dimensions: {
      width: 3000,
      height: 1926,
    },
    characters: [
      {
        _id: "6736274e31d56dba97768394",
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.612, y: 0.362 },
          b: { x: 0.627, y: 0.362 },
          c: { x: 0.627, y: 0.414 },
          d: { x: 0.612, y: 0.414 },
        },
      },
      {
        _id: "6736274e31d56dba97768395",
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.767, y: 0.398 },
          b: { x: 0.778, y: 0.398 },
          c: { x: 0.778, y: 0.423 },
          d: { x: 0.767, y: 0.423 },
        },
      },
      {
        _id: "6736274e31d56dba97768396",
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.103, y: 0.346 },
          b: { x: 0.113, y: 0.346 },
          c: { x: 0.113, y: 0.389 },
          d: { x: 0.103, y: 0.389 },
        },
      },
      {
        _id: "6736274e31d56dba97768397",
        character: "66601f7a66990e4269078fd2",
        coordinates: {
          a: { x: 0.264, y: 0.341 },
          b: { x: 0.283, y: 0.341 },
          c: { x: 0.283, y: 0.386 },
          d: { x: 0.264, y: 0.386 },
        },
      },
    ],
    colorTheme: {
      body: "#a78bfa", // purple-400
      gameCardBackground: "#8b5cf6", // purple-500
      gameCard: "#a78bfa", // purple-400
      gameCardHover: "#7c3aed", // purple-600
      gameIcons: "#a78bfa", // purple-400
      gameCanvas: "#8b5cf6", // purple-500
      gameModal: "#7c3aed", // purple-600
      gameButton: "#8b5cf6", // purple-500
      gameButtonHover: "#6d28d9", // purple-700
      gameHeader: "#8b5cf6", // purple-500
      gameMessageBox: "#e9d5ff", // purple-200
      goBackButtonHover: "#d8b4fe", // purple-300
      dropDownMenu: "#8b5cf6", // purple-500
      dropDownMenuItem: "#8b5cf6", // purple-500
      dropDownMenuItemHover: "#6d28d9", // purple-700
    },
    leaderboard: [],
  },

  {
    _id: "66601f7b66990e4269078fe7",
    title: "Space",
    difficulty: "medium",
    description:
      "Blast off into the cosmos for an out-of-this-world search! Navigate through bustling space stations, alien marketplaces, and intergalactic traffic jams. Can you spot Waldo, Wenda, Odlaw, and Wizard Whitebeard floating among astronauts, robots, and curious extraterrestrials? Houston, we have a challenge—find all four characters before your oxygen runs out!",
    image: "space.png",
    dimensions: {
      width: 3000,
      height: 1975,
    },
    characters: [
      {
        _id: "6736274e31d56dba9776839a",
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.4, y: 0.615 },
          b: { x: 0.41, y: 0.615 },
          c: { x: 0.41, y: 0.65 },
          d: { x: 0.4, y: 0.65 },
        },
      },
      {
        _id: "6736274e31d56dba9776839b",
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.289, y: 0.509 },
          b: { x: 0.299, y: 0.509 },
          c: { x: 0.299, y: 0.541 },
          d: { x: 0.289, y: 0.541 },
        },
      },
      {
        _id: "6736274e31d56dba9776839c",
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.065, y: 0.68 },
          b: { x: 0.075, y: 0.68 },
          c: { x: 0.075, y: 0.71 },
          d: { x: 0.065, y: 0.71 },
        },
      },
      {
        _id: "6736274e31d56dba9776839d",
        character: "66601f7a66990e4269078fd2",
        coordinates: {
          a: { x: 0.775, y: 0.565 },
          b: { x: 0.785, y: 0.565 },
          c: { x: 0.785, y: 0.605 },
          d: { x: 0.775, y: 0.605 },
        },
      },
    ],
    colorTheme: {
      body: "#f87171", // red-400
      gameCardBackground: "#ef4444", // red-500
      gameCard: "#f87171", // red-400
      gameCardHover: "#dc2626", // red-600
      gameIcons: "#f87171", // red-400
      gameCanvas: "#ef4444", // red-500
      gameModal: "#dc2626", // red-600
      gameButton: "#ef4444", // red-500
      gameButtonHover: "#b91c1c", // red-700
      gameHeader: "#ef4444", // red-500
      gameMessageBox: "#fecaca", // red-200
      goBackButtonHover: "#fca5a5", // red-300
      dropDownMenu: "#ef4444", // red-500
      dropDownMenuItem: "#ef4444", // red-500
      dropDownMenuItemHover: "#b91c1c", // red-700
    },
    leaderboard: [],
  },

  {
    _id: "66601f7b66990e4269078fee",
    title: "Hollywood",
    difficulty: "medium",
    description:
      "Welcome to Hollywood's biggest premiere! Race against the clock to find Waldo, Wenda, Odlaw, and Wizard Whitebeard hidden among the stars and film crews. Your timer starts now—spot all four characters as quickly as possible to top the leaderboard and claim your Hollywood fame!",
    image: "hollywood.jpeg",
    dimensions: {
      width: 5120,
      height: 2880,
    },
    characters: [
      {
        _id: "6736274e31d56dba977683a0",
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.698, y: 0.412 },
          b: { x: 0.71, y: 0.412 },
          c: { x: 0.71, y: 0.443 },
          d: { x: 0.698, y: 0.443 },
        },
      },
      {
        _id: "6736274e31d56dba977683a1",
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.587, y: 0.687 },
          b: { x: 0.596, y: 0.687 },
          c: { x: 0.596, y: 0.714 },
          d: { x: 0.587, y: 0.714 },
        },
      },
      {
        _id: "6736274e31d56dba977683a2",
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.55, y: 0.83 },
          b: { x: 0.56, y: 0.83 },
          c: { x: 0.56, y: 0.854 },
          d: { x: 0.55, y: 0.854 },
        },
      },
      {
        _id: "6736274e31d56dba977683a3",
        character: "66601f7a66990e4269078fd2",
        coordinates: {
          a: { x: 0.685, y: 0.689 },
          b: { x: 0.702, y: 0.689 },
          c: { x: 0.702, y: 0.725 },
          d: { x: 0.685, y: 0.725 },
        },
      },
    ],
    colorTheme: {
      body: "#fbbf24", // amber-400
      gameCardBackground: "#f59e0b", // amber-500
      gameCard: "#fbbf24", // amber-400
      gameCardHover: "#d97706", // amber-600
      gameIcons: "#fbbf24", // amber-400
      gameCanvas: "#f59e0b", // amber-500
      gameModal: "#d97706", // amber-600
      gameButton: "#f59e0b", // amber-500
      gameButtonHover: "#b45309", // amber-700
      gameHeader: "#f59e0b", // amber-500
      gameMessageBox: "#fde68a", // amber-200
      goBackButtonHover: "#fcd34d", // amber-300
      dropDownMenu: "#f59e0b", // amber-500
      dropDownMenuItem: "#f59e0b", // amber-500
      dropDownMenuItemHover: "#b45309", // amber-700
    },
    leaderboard: [],
  },

  {
    _id: "66601f7b66990e4269078ff5",
    title: "Fruit-World",
    difficulty: "hard",
    description:
      "Welcome to the most deliciously chaotic farmers market ever! Weave through towering fruit stands, busy juice vendors, and enthusiastic shoppers in this fruity paradise. Can you find Waldo, Wenda, Odlaw, and Wizard Whitebeard hidden among the colorful chaos of apples, oranges, and exotic fruits? This is the ultimate challenge—every second counts in this vitamin-packed adventure!",
    image: "fruit-world.jpeg",
    dimensions: {
      width: 5120,
      height: 2880,
    },
    characters: [
      {
        _id: "6736274e31d56dba977683a6",
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.886, y: 0.681 },
          b: { x: 0.898, y: 0.681 },
          c: { x: 0.898, y: 0.701 },
          d: { x: 0.886, y: 0.701 },
        },
      },
      {
        _id: "6736274e31d56dba977683a7",
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.129, y: 0.891 },
          b: { x: 0.138, y: 0.891 },
          c: { x: 0.138, y: 0.91 },
          d: { x: 0.129, y: 0.91 },
        },
      },
      {
        _id: "6736274e31d56dba977683a8",
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.656, y: 0.563 },
          b: { x: 0.665, y: 0.563 },
          c: { x: 0.665, y: 0.584 },
          d: { x: 0.656, y: 0.584 },
        },
      },
      {
        _id: "6736274e31d56dba977683a9",
        character: "66601f7a66990e4269078fd2",
        coordinates: {
          a: { x: 0.245, y: 0.476 },
          b: { x: 0.256, y: 0.476 },
          c: { x: 0.256, y: 0.504 },
          d: { x: 0.245, y: 0.504 },
        },
      },
    ],
    colorTheme: {
      body: "#4ade80", // green-400
      gameCardBackground: "#22c55e", // green-500
      gameCard: "#4ade80", // green-400
      gameCardHover: "#16a34a", // green-600
      gameIcons: "#4ade80", // green-400
      gameCanvas: "#22c55e", // green-500
      gameModal: "#16a34a", // green-600
      gameButton: "#22c55e", // green-500
      gameButtonHover: "#15803d", // green-700
      gameHeader: "#22c55e", // green-500
      gameMessageBox: "#bbf7d0", // green-200
      goBackButtonHover: "#86efac", // green-300
      dropDownMenu: "#22c55e", // green-500
      dropDownMenuItem: "#22c55e", // green-500
      dropDownMenuItemHover: "#15803d", // green-700
    },
    leaderboard: [],
  },
];

export default games;
