import GameCard from "./GameCard.jsx";

import Icon from "@mdi/react";
import { mdiChevronDoubleDown } from "@mdi/js";

import { motion } from "framer-motion";

const Games = ({ user, games }) => {
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
        className="w-full flex-grow mt-32 flex flex-col justify-center items-center text-white"
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
      {games.map((game, index) => {
        if (index <= user.playedGames.length) {
          console.log("Render game card titled:", game.title);
          return <GameCard key={game.id} user={user} game={game} />;
        }
      })}
    </div>
  );
};

export default Games;
