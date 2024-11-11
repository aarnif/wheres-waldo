import { useState } from "react";
import { motion } from "framer-motion";

const GameOverModal = ({ game, time, startNewGame, handleChangeGame }) => {
  const [isHoveredNewGame, setIsHoveredNewGame] = useState(false);
  const [isHoveredChangeGame, setIsHoveredChangeGame] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-center items-center bg-black z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: game.colorTheme.gameModal }}
        className="overflow-auto w-[600px] h-[350px] p-12 flex flex-col justify-center items-center bg-slate-800 rounded-xl text-slate-100 z-100"
      >
        <h1 className="w-full mb-8 flex-grow text-2xl font-bold text-center">
          Congratulations! You found all the characters!
        </h1>

        <h2 className="w-full mb-8 flex-grow text-xl font-bold text-center">
          Your time was:
        </h2>

        <h1 className="w-full mb-8 flex-grow text-3xl font-bold text-center">
          {time}
        </h1>

        <div className="w-full flex-grow flex justify-center items-center">
          <button
            onMouseEnter={() => setIsHoveredNewGame(true)}
            onMouseLeave={() => setIsHoveredNewGame(false)}
            onClick={startNewGame}
            style={{
              backgroundColor: isHoveredNewGame
                ? game.colorTheme.gameButtonHover
                : game.colorTheme.gameButton,
            }}
            className="mr-4 w-full flex-grow max-w-[200px] h-[80px] bg-slate-900 rounded-xl text-xl font-bold
          hover:bg-black active:scale-95 transition"
          >
            NEW GAME
          </button>

          <button
            onMouseEnter={() => setIsHoveredChangeGame(true)}
            onMouseLeave={() => setIsHoveredChangeGame(false)}
            onClick={handleChangeGame}
            style={{
              backgroundColor: isHoveredChangeGame
                ? game.colorTheme.gameButtonHover
                : game.colorTheme.gameButton,
            }}
            className="ml-4 w-full flex-grow max-w-[200px] h-[80px] bg-slate-900 rounded-xl text-xl font-bold
          hover:bg-black active:scale-95 transition"
          >
            CHANGE GAME
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal;
