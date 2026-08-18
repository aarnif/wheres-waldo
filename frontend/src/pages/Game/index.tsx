import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { getGameById } from "../../services/games";
import GamePreview from "./GamePreview";
import type { GameDetails } from "../../types";
import GameView from "./GameView";

const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState<GameDetails | null>(null);
  const [gamePreview, setGamePreview] = useState(true);

  const handleStartGame = () => {
    setGamePreview(false);
  };

  const handleCancelGame = () => {
    setGamePreview(true);
  };

  useEffect(() => {
    getGameById(id ?? "")
      .then(setGame)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="h-screen w-full bg-[url('/background.png')] bg-cover bg-center">
      <AnimatePresence mode="wait">
        {gamePreview || !game ? (
          <GamePreview
            key="game-preview"
            game={game}
            handleStartGame={handleStartGame}
          />
        ) : (
          <GameView
            key="game-view"
            game={game}
            handleCancelGame={handleCancelGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;
