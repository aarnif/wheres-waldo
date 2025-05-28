import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import GamePreview from "./GamePreview";
import GameView from "./GameView";

const Game = ({ user, setUser, currentGame, setGames }) => {
  const [isGamePreview, setIsGamePreview] = useState(true);

  const handleStartGame = () => {
    console.log("Starting game...");
    setIsGamePreview(false);
  };

  const handleEndGame = () => {
    console.log("Ending game...");
    setIsGamePreview(true);
  };

  return (
    <AnimatePresence>
      {isGamePreview ? (
        <GamePreview
          currentGame={currentGame}
          handleStartGame={handleStartGame}
        />
      ) : (
        <GameView
          user={user}
          setUser={setUser}
          currentGame={currentGame}
          setGames={setGames}
          handleEndGame={handleEndGame}
        />
      )}
    </AnimatePresence>
  );
};

export default Game;
