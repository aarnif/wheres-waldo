import baseUrl from "../../../baseUrl";
import utils from "../../utils";
import GameStartModal from "./GameStartModal";
import GameHeader from "./GameHeader";
import AimCursor from "./AimCursor";
import DropDownMenu from "./DropDownMenu";

import { useState, useEffect, useRef } from "react";

const Game = ({ game }) => {
  const timer = useRef(0);

  const [time, setTime] = useState(timer.current);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [showAimCursor, setShowAimCursor] = useState(false);
  const [aimCordinates, setAimCordinates] = useState({ x: 0, y: 0 });

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownCoordinates, setDropDownCoordinates] = useState({
    x: 0,
    y: 0,
  });

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

  const handleCanvasClick = (event) => {
    console.log("Clicked canvas at:", event.pageX, event.pageY);
    console.log("Showing dropdown menu");
    setShowDropdown(!showDropdown);
    setDropDownCoordinates({ x: event.pageX, y: event.pageY });
  };

  const moveAimCursor = (event) => {
    console.log(`Moving aim cursor to: ${event.pageX}, ${event.pageY}`);
    setAimCordinates({ x: event.pageX, y: event.pageY });
  };

  const handleMouseOver = () => {
    console.log("Mouse over aim cursor");
    setShowAimCursor(true);
  };

  const handleMouseOut = () => {
    console.log("Mouse out of aim cursor");
    setShowAimCursor(false);
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
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseMove={moveAimCursor}
        onClick={handleCanvasClick}
      >
        {showAimCursor && <AimCursor aimCordinates={aimCordinates} />}
        {showDropdown && (
          <DropDownMenu
            dropDownCoordinates={dropDownCoordinates}
            gameCharacters={game.characters}
          />
        )}
      </div>
    </>
  );
};

export default Game;
