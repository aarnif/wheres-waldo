import { motion } from "framer-motion";

const GameMessageDisplay = ({ gameMessage }) => {
  return (
    <motion.div className="pointer-events-none fixed inset-0 flex justify-center items-end">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="m-8 p-8 rounded-xl z-10 bg-slate-900/40 flex justify-center items-center"
      >
        <h1
          className="font-bold text-2xl text-white"
          style={{
            color: gameMessage.includes("That is not")
              ? "oklch(80.8% 0.114 19.571)"
              : "oklch(87.1% 0.15 154.449)",
          }}
        >
          {gameMessage.toUpperCase()}
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default GameMessageDisplay;
