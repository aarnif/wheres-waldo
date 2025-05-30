import baseUrl from "../../../baseUrl";

import Icon from "@mdi/react";
import { mdiChevronLeft, mdiCheck } from "@mdi/js";

const GameHeader = ({ game, time, handleChangeGame }) => {
  const { id, characters } = game;
  return (
    <header
      id="game-header"
      className="z-10 px-8 py-2 fixed w-full flex justify-between items-center text-white"
    >
      <div className="flex justify-center items-center">
        <button
          onClick={handleChangeGame}
          className="w-10 h-10 rounded-full border border-slate-900/0 bg-slate-900/40 hover:bg-slate-900/50 active:border-slate-900/40 active:inset-shadow-sm flex justify-center items-center transition"
        >
          <Icon
            path={mdiChevronLeft}
            size={1.7}
            className="fill-current text-slate-50"
          />
        </button>
      </div>
      <div className="flex-grow flex justify-center">
        <div className="flex justify-center gap-16 flex-wrap bg-slate-900/40 px-2 rounded-lg shadow-lg">
          {characters?.map((character) => (
            <div
              key={character.character.name}
              className="flex flex-col items-center gap-1"
            >
              <div className="relative p-1 rounded-lg flex items-center justify-center">
                <img
                  className={`w-12 h-12 rounded-lg object-cover ${
                    character.isFound ? "brightness-75" : ""
                  }`}
                  src={`${baseUrl}/games/${id}/characters/${character.id}/image`}
                  alt={character.character.name}
                />
                {character.isFound && (
                  <div className="absolute inset-0 flex justify-center items-center rounded-lg">
                    <Icon
                      path={mdiCheck}
                      title="Check"
                      size={3}
                      className="fill-current text-green-400"
                    />
                  </div>
                )}
              </div>
              <span
                className={`${
                  character.isFound ? "text-slate-300" : "text-slate-50"
                } text-base font-bold text-center`}
              >
                {character.character.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center">
        <h1 className="font-mono text-2xl font-bold bg-slate-900/40 p-1 rounded-lg">
          {time}
        </h1>
      </div>
    </header>
  );
};

export default GameHeader;
