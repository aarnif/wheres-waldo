const games = [
  {
    _id: "66c735869b3ffb61c2978a89",
    title: "Ski-Resort",
    difficulty: "easy",
    image: "ski-resort.jpeg",
    characters: [
      {
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.839, y: 0.738 },
          b: { x: 0.877, y: 0.738 },
          c: { x: 0.877, y: 0.807 },
          d: { x: 0.839, y: 0.807 },
        },
      },
      {
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.483, y: 0.391 },
          b: { x: 0.496, y: 0.391 },
          c: { x: 0.496, y: 0.436 },
          d: { x: 0.483, y: 0.436 },
        },
      },
      {
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.31, y: 0.643 },
          b: { x: 0.323, y: 0.643 },
          c: { x: 0.323, y: 0.678 },
          d: { x: 0.31, y: 0.678 },
        },
      },
      {
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
    image: "beach.jpg",
    characters: [
      {
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.612, y: 0.362 },
          b: { x: 0.627, y: 0.362 },
          c: { x: 0.627, y: 0.414 },
          d: { x: 0.612, y: 0.414 },
        },
      },
      {
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.767, y: 0.398 },
          b: { x: 0.778, y: 0.398 },
          c: { x: 0.778, y: 0.423 },
          d: { x: 0.767, y: 0.423 },
        },
      },
      {
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.103, y: 0.346 },
          b: { x: 0.113, y: 0.346 },
          c: { x: 0.113, y: 0.389 },
          d: { x: 0.103, y: 0.389 },
        },
      },
      {
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
    image: "space.png",
    characters: [
      {
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.4, y: 0.615 },
          b: { x: 0.41, y: 0.615 },
          c: { x: 0.41, y: 0.65 },
          d: { x: 0.4, y: 0.65 },
        },
      },
      {
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.289, y: 0.509 },
          b: { x: 0.299, y: 0.509 },
          c: { x: 0.299, y: 0.541 },
          d: { x: 0.289, y: 0.541 },
        },
      },
      {
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.065, y: 0.68 },
          b: { x: 0.075, y: 0.68 },
          c: { x: 0.075, y: 0.71 },
          d: { x: 0.065, y: 0.71 },
        },
      },
      {
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
    image: "hollywood.jpeg",
    characters: [
      {
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.698, y: 0.412 },
          b: { x: 0.71, y: 0.412 },
          c: { x: 0.71, y: 0.443 },
          d: { x: 0.698, y: 0.443 },
        },
      },
      {
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.587, y: 0.687 },
          b: { x: 0.596, y: 0.687 },
          c: { x: 0.596, y: 0.714 },
          d: { x: 0.587, y: 0.714 },
        },
      },
      {
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.55, y: 0.83 },
          b: { x: 0.56, y: 0.83 },
          c: { x: 0.56, y: 0.854 },
          d: { x: 0.55, y: 0.854 },
        },
      },
      {
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
    image: "fruit-world.jpeg",
    characters: [
      {
        character: "66601f7a66990e4269078fd0",
        coordinates: {
          a: { x: 0.886, y: 0.681 },
          b: { x: 0.898, y: 0.681 },
          c: { x: 0.898, y: 0.701 },
          d: { x: 0.886, y: 0.701 },
        },
      },
      {
        character: "66601f7a66990e4269078fd3",
        coordinates: {
          a: { x: 0.129, y: 0.891 },
          b: { x: 0.138, y: 0.891 },
          c: { x: 0.138, y: 0.91 },
          d: { x: 0.129, y: 0.91 },
        },
      },
      {
        character: "66601f7a66990e4269078fd1",
        coordinates: {
          a: { x: 0.656, y: 0.563 },
          b: { x: 0.665, y: 0.563 },
          c: { x: 0.665, y: 0.584 },
          d: { x: 0.656, y: 0.584 },
        },
      },
      {
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
