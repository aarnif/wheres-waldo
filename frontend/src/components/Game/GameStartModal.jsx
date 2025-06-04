import { motion } from "framer-motion";

import GameCharacter from "../GameCharacter";

const GameStartModal = ({ game, startNewGame, handleEndGame }) => {
  const { id, characters } = game;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-4 w-full max-w-[600px] p-4 sm:p-8 flex flex-col justify-center items-center gap-8 sm:gap-12 bg-slate-800 rounded-xl text-slate-100"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-center">
          Find the following characters
        </h1>

        <div className="flex justify-center gap-4 sm:gap-8">
          {characters?.map((character) => (
            <GameCharacter
              key={character.id}
              gameId={id}
              character={character}
            />
          ))}
        </div>

        <div className="w-full flex flex-col-reverse sm:flex-row justify-center gap-4 sm:gap-8">
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
