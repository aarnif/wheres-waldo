import GameCharacters from "../Games/GameCharacters";

const GameHeader = ({ game, time }) => {
  return (
    <header className="z-10 fixed w-full h-[150px] flex justify-center items-center shadow-lg bg-red-600 text-white">
      <h1 className="ml-8 flex-grow max-w-[500px] min-w-[300px] font-title text-4xl font-bold text-right">
        {game.title}
      </h1>
      <GameCharacters game={game} location={"header"} />
      <h1 className="mr-8 flex-grow max-w-[500px] min-w-[300px] font-title text-4xl font-bold text-left">
        {time}
      </h1>
    </header>
  );
};

export default GameHeader;
