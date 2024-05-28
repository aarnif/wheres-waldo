const Game = ({ game }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-red-500">
      {game.title}
    </div>
  );
};

export default Game;
