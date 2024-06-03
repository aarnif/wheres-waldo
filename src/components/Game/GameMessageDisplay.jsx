import { motion } from "framer-motion";

const GameMessageDisplay = ({ gameMessage }) => {
  return (
    <motion.div className="fixed inset-0 flex justify-end items-end">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="m-8 p-8 bg-white bg-opacity-60 rounded-xl z-10"
      >
        <h1
          className="text-slate-800 font-bold text-4xl"
          style={{
            color: gameMessage.includes("That is not") ? "red" : "green",
          }}
        >
          {gameMessage.toUpperCase()}
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default GameMessageDisplay;
