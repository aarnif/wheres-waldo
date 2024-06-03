import GameCard from "./GameCard.jsx";

import Icon from "@mdi/react";
import { mdiChevronDoubleDown } from "@mdi/js";

import { motion, AnimatePresence } from "framer-motion";

const Games = ({ games }) => {
  return (
    <div
      className="w-full flex-grow flex flex-col justify-center items-center bg-red-500"
      style={{
        backgroundColor: games[0].colorTheme.gameCanvas,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, y: -50 }}
        className="w-full flex-grow min-h-[500px] flex flex-col justify-center items-center text-white"
      >
        <h1 className="mb-8 text-5xl font-bold">Scroll Down To Play</h1>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Icon path={mdiChevronDoubleDown} size={5} className="fill-current" />
        </motion.div>
      </motion.div>
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Games;
