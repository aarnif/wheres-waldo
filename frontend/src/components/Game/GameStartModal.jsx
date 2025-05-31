import { motion } from "framer-motion";

import baseUrl from "../../../baseUrl";

const GameStartModal = ({ game, startNewGame, handleEndGame }) => {
  const { id, characters } = game;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-8 w-full max-w-[600px] p-8 flex flex-col justify-center items-center gap-12 bg-slate-800 rounded-xl text-slate-100"
      >
        <h1 className="text-2xl font-bold text-center">
          Find the following characters
        </h1>

        <div className="flex justify-center gap-8">
          {characters?.map((character) => (
            <div
              key={character.character.name}
              className="flex flex-col items-center gap-1"
            >
              <div className="relative p-2 rounded-lg flex items-center justify-center bg-slate-600">
                <img
                  className="w-12 h-12 rounded-lg object-cover"
                  src={`${baseUrl}/games/${id}/characters/${character.id}/image`}
                  alt={character.character.name}
                />
              </div>
              <span className="text-base font-bold text-center">
                {character.character.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-8">
          <button
            onClick={handleEndGame}
            className="px-7 py-3 shadow-lg border border-slate-600 bg-slate-600 hover:bg-slate-700 hover:border-slate-700 active:border-slate-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out"
          >
            Go Back
          </button>
          <button
            onClick={startNewGame}
            className="px-7 py-3 shadow-lg border border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 active:border-red-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out"
          >
            Play Game
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameStartModal;
