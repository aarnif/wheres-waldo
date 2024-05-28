import GameCard from "./GameCard.jsx";

const Games = ({ games }) => {
  // Colors for the game cards are based on the tailwindcss color palette
  const gameStyleColors = [
    {
      background: "#ef4444", // Red 500
      gameCard: "#f87171", // Red 400
      hover: "#dc2626", // Red 600
    },
    {
      background: "#3b82f6", // Blue 500
      gameCard: "#60a5fa", // Blue 400
      hover: "#2563eb", // Blue 600
    },
    {
      background: "#10b981", // Green 500
      gameCard: "#34d399", // Green 400
      hover: "#059669", // Green 600
    },
    {
      background: "#f59e0b", // Amber 500
      gameCard: "#fbbf24", // Amber 400
      hover: "#d97706", // Amber 600
    },
    {
      background: "#6366f1", // Indigo 500
      gameCard: "#818cf8", // Indigo 400
      hover: "#4f46e5", // Indigo 600
    },
    {
      background: "#8b5cf6", // Purple 500
      gameCard: "#a78bfa", // Purple 400
      hover: "#7c3aed", // Purple 600
    },
    {
      background: "#ec4899", // Pink 500
      gameCard: "#f472b6", // Pink 400
      hover: "#db2777", // Pink 600
    },
    {
      background: "#f43f5e", // Rose 500
      gameCard: "#fb7185", // Rose 400
      hover: "#e11d48", // Rose 600
    },
    {
      background: "#14b8a6", // Teal 500
      gameCard: "#2dd4bf", // Teal 400
      hover: "#0f766e", // Teal 600
    },
    {
      background: "#22d3ee", // Cyan 500
      gameCard: "#67e8f9", // Cyan 400
      hover: "#0891b2", // Cyan 600
    },
  ];

  return (
    <div className="flex-grow flex justify-center items-center bg-red-500">
      {games.map((game, index) => (
        <GameCard
          key={game.id}
          game={game}
          gameStyleColors={gameStyleColors[index]}
        />
      ))}
    </div>
  );
};

export default Games;
