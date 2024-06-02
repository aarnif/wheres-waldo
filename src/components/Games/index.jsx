import GameCard from "./GameCard.jsx";

const Games = ({ games }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-red-500">
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Games;
