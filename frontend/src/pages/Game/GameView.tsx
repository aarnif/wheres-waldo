import type { GameDetails } from "../../types";
import GameStart from "./GameStart";

const GameView = ({
  game,
  handleCancelGame,
}: {
  game: GameDetails;
  handleCancelGame: () => void;
}) => {
  const { title, characters } = game;

  return (
    <div className="h-screen w-screen overflow-auto">
      <GameStart
        title={title}
        characters={characters}
        handleCancelGame={handleCancelGame}
      />
    </div>
  );
};

export default GameView;
