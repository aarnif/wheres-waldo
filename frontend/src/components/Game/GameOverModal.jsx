import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GameOverModal = ({ time, startNewGame, handleChangeGame }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-center items-center bg-black z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
        transition={{ duration: 0.3 }}
        className="mx-8 w-full max-w-[600px] p-8 flex flex-col justify-center items-center bg-slate-800 rounded-xl text-slate-100"
      >
        <h2 className="mb-2 text-xl font-bold text-center">Congratulations!</h2>

        <h2 className="mb-4 text-xl font-bold text-center">
          You found all the characters!
        </h2>

        <h2 className="w-full mb-4 flex-grow text-xl font-bold text-center">
          Your time was:
        </h2>

        <h1 className="w-full mb-8 flex-grow text-2xl font-bold text-center text-slate-50">
          {time}
        </h1>

        <div className="flex gap-8">
          <button
            onClick={startNewGame}
            className="px-7 py-3 shadow-lg border border-slate-600 bg-slate-600 hover:bg-slate-700 hover:border-slate-700 active:border-slate-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out"
          >
            Play Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-7 py-3 shadow-lg border border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 active:border-red-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out"
          >
            Change Game
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal;
