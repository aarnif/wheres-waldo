import GameCard from "./GameCard.jsx";

import { useState } from "react";
import Icon from "@mdi/react";
import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from "@mdi/js";

import { motion } from "framer-motion";

const Games = ({ user, games }) => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  console.log("Render game card titled:", games[currentGameIndex].title);

  const handlePreviousGame = () => {
    setCurrentGameIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) =>
      prevIndex === games.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  return (
    <div className="w-full flex-grow flex justify-center items-center backdrop-blur-sm">
      <motion.button
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ opacity: 1, x: 0 }}
        whileTap={{ opacity: 0, x: -15 }}
        exit={{ opacity: 0, x: 30 }}
        className="w-full flex justify-center items-center text-white"
        onClick={handlePreviousGame}
      >
        {currentGameIndex > 0 && (
          <Icon
            path={mdiChevronDoubleLeft}
            size={5}
            className="fill-current text-white hover:text-zinc-500 transition"
          />
        )}
      </motion.button>
      <GameCard
        key={games[currentGameIndex].id}
        user={user}
        game={games[currentGameIndex]}
      />

      <motion.button
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ opacity: 1, x: 0 }}
        whileTap={{ opacity: 0, x: 15 }}
        exit={{ opacity: 0, x: -30 }}
        className="w-full flex justify-center items-center text-white"
        onClick={handleNextGame}
      >
        {currentGameIndex < games.length - 1 && (
          <Icon
            path={mdiChevronDoubleRight}
            size={5}
            className="fill-current text-white hover:text-zinc-500 transition"
          />
        )}
      </motion.button>
    </div>
  );
};

export default Games;
