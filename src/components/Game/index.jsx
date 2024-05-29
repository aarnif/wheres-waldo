import baseUrl from "../../../baseUrl";
import utils from "../../utils";
import GameStartModal from "./GameStartModal";
import GameHeader from "./GameHeader";

import { useState, useEffect, useRef } from "react";

const Game = ({ game }) => {
  const timer = useRef(0);

  const [time, setTime] = useState(timer.current);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
  };

  const resetTimer = () => {
    clearInterval(timer.current);
    timer.current = 0;
    setTime(0);
  };

  const stopTimer = () => {
    clearInterval(timer.current);
  };

  const startNewGame = async () => {
    console.log("Start new game");
    setHasGameStarted(true);
    resetTimer();
    startTimer();
  };

  if (!hasGameStarted) {
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ flexGrow: 1 }}
      >
        <GameStartModal game={game} startNewGame={startNewGame} />
      </main>
    );
  }

  return (
    <>
      <GameHeader game={game} time={utils.formatTime(time)} />
      <div
        style={{
          backgroundImage: `url(${baseUrl}/games/${game.id}/image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="mt-[150px] flex-grow flex flex-col justify-center items-center bg-red-500"
      ></div>
    </>
  );
};

export default Game;
