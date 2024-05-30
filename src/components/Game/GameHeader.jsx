import GameCharacters from "../Games/GameCharacters";

import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";

const GameHeader = ({ game, time, handleChangeGame }) => {
  return (
    <header
      id="game-header"
      className="z-10 fixed w-full h-[120px] flex justify-center items-center shadow-lg bg-red-600 text-white"
    >
      <div className="ml-8 flex-grow max-w-[400px] min-w-[300px]">
        <h1 className="font-title text-4xl font-bold text-center">
          {game.title}
        </h1>
      </div>
      <GameCharacters game={game} location={"header"} />
      <div className="mr-8 flex-grow max-w-[400px] min-w-[300px] flex justify-around items-center">
        <h1 className="max-w-[200px] min-w-[200px] font-title text-4xl font-bold text-left">
          {time}
        </h1>
        <button
          onClick={handleChangeGame}
          className="max-w-[100px] min-w-[50px]"
        >
          <Icon
            path={mdiArrowLeftCircle}
            size={2}
            className="fill-current text-white hover:text-red-300 active:scale-95 transition"
          />
        </button>
      </div>
    </header>
  );
};

export default GameHeader;
