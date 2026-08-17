import { motion } from "motion/react";
import { Link } from "react-router";

const GameEnd = ({
  time,
  handleStartAgain,
}: {
  time: string;
  handleStartAgain: () => void;
}) => (
  <div className="fixed inset-0 z-100 flex items-center justify-start bg-black/90 p-4 backdrop-blur-sm sm:p-16">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 400,
          damping: 20,
          mass: 0.8,
        }}
        className="flex w-full max-w-122.5 flex-col gap-8 rounded-lg border border-slate-50/20 bg-slate-900/20 px-4 py-4 shadow-lg sm:gap-10 sm:px-8"
      >
        <h1 className="font-title text-center text-4xl font-bold text-red-600">
          Congratulations
        </h1>

        <div className="flex flex-col gap-4">
          <p className="text-center text-xl font-bold text-slate-50">
            You found all characters!
          </p>

          <p className="text-center text-xl font-bold text-slate-50">
            Your time was:
          </p>
        </div>

        <p className="text-center text-3xl font-bold text-white">{time}</p>

        <div className="flex justify-center">
          <div className="flex max-w-96 grow gap-8 text-white">
            <button
              onClick={handleStartAgain}
              className="grow cursor-pointer rounded-lg bg-slate-500 py-1.5 text-center text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-slate-600 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
            >
              Play Again
            </button>
            <Link
              to="/"
              className="grow cursor-pointer rounded-lg bg-red-600 py-1.5 text-center text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-red-700 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
            >
              Next Game
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default GameEnd;
