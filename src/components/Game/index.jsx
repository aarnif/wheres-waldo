import baseUrl from "../../../baseUrl";
import GameStartModal from "./GameStartModal";

import { useState } from "react";

const Game = ({ game }) => {
  const [hasGameStarted, setHasGameStarted] = useState(false);

  if (!hasGameStarted) {
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ flexGrow: 1 }}
      >
        <GameStartModal game={game} setHasGameStarted={setHasGameStarted} />
      </main>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${baseUrl}/games/${game.id}/image)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex-grow flex flex-col justify-center items-center bg-red-500"
    >
      {game.title}
    </div>
  );
};

export default Game;
