import GameCharacters from "../Games/GameCharacters";

import { useState } from "react";

import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";

const GameHeader = ({ game, time, handleChangeGame }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <header
      id="game-header"
      style={{ backgroundColor: game.colorTheme.gameHeader }}
      className="z-10 fixed w-full h-[120px] flex justify-center items-center shadow-lg bg-zinc-600 text-white"
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
            style={{
              color: hovered && game.colorTheme.goBackButtonHover,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="fill-current text-white active:scale-95 transition"
          />
        </button>
      </div>
    </header>
  );
};

export default GameHeader;
