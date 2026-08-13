import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getGameById } from "../../services/games";
import GamePreview from "./GamePreview";
import type { GameDetails } from "../../types";

const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState<GameDetails | null>(null);

  useEffect(() => {
    getGameById(id ?? "")
      .then(setGame)
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="h-screen w-full bg-[url('/background.png')] bg-cover bg-center">
      <GamePreview game={game} />
    </div>
  );
};

export default Game;
