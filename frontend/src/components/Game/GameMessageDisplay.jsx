import utils from "../../utils";
import { motion } from "framer-motion";

const GameMessageDisplay = ({ colorTheme, gameMessage }) => {
  return (
    <motion.div className="pointer-events-none fixed inset-0 flex justify-center items-end">
      <motion.div
        style={{
          backgroundColor: utils.hexToRgba(colorTheme.gameMessageBox, 0.8),
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="m-8 p-8 rounded-xl z-10"
      >
        <h1
          className="font-bold text-4xl text-white"
          style={{
            color: gameMessage.includes("That is not") ? "#ef4444" : "#22c55e",
          }}
        >
          {gameMessage.toUpperCase()}
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default GameMessageDisplay;
