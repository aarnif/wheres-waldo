import baseUrl from "../../../baseUrl";
import utils from "../../utils";

import GameOverModal from "./GameOverModal";
import GameStartModal from "./GameStartModal";
import GameHeader from "./GameHeader";
import GameMessageDisplay from "./GameMessageDisplay";
import AimCursor from "./AimCursor";
import DropDownMenu from "./DropDownMenu";

import { useState, useEffect, useRef } from "react";

const Game = ({ game }) => {
  const timer = useRef(0);

  const [time, setTime] = useState(timer.current);

  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const [gameMessage, setGameMessage] = useState("");
  const [showGameMessage, setShowGameMessage] = useState(false);

  const [showAimCursor, setShowAimCursor] = useState(false);
  const [aimCordinates, setAimCordinates] = useState({ x: 0, y: 0 });

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownCoordinates, setDropDownCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const [clickedCoordinates, setClickedCoordinates] = useState({ x: 0, y: 0 });

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
    setIsGameOver(false);
    resetTimer();
    startTimer();
  };

  const handleCanvasClick = (event) => {
    const gameHeader = document.getElementById("game-header");
    const gameImage = document.getElementById("game-image");
    const normalisedX = (event.pageX / gameImage.offsetWidth).toFixed(3);
    const normalisedY = (
      (event.pageY - gameHeader.offsetHeight) /
      gameImage.offsetHeight
    ).toFixed(3);
    console.log("Normalised coordinates:", normalisedX, normalisedY);
    setShowDropdown(!showDropdown);
    setDropDownCoordinates({ x: event.pageX, y: event.pageY });
    setClickedCoordinates({ x: Number(normalisedX), y: Number(normalisedY) });
  };

  const moveAimCursor = (event) => {
    // console.log(`Moving aim cursor to: ${event.pageX}, ${event.pageY}`);
    setAimCordinates({ x: event.pageX, y: event.pageY });
  };

  const handleMouseOver = () => {
    // console.log("Mouse over aim cursor");
    setShowAimCursor(true);
  };

  const handleMouseOut = () => {
    // console.log("Mouse out of aim cursor");
    setShowAimCursor(false);
  };

  const checkIfGameOver = () => {
    return game.characters.every((character) => character.isFound);
  };

  const handleShowGameMessage = () => {
    setShowGameMessage(true);
    setTimeout(() => {
      setShowGameMessage(false);
    }, 3000);
  };

  const handleDropDownClick = (event) => {
    const chosenCharacter = game.characters.find(
      (character) => character.id === event.target.id
    );
    console.log("Clicked on character:", chosenCharacter);
    console.log("Clicked coordinates:", clickedCoordinates);
    if (
      clickedCoordinates.x >= chosenCharacter.coordinates.a.x &&
      clickedCoordinates.x <= chosenCharacter.coordinates.b.x &&
      clickedCoordinates.y >= chosenCharacter.coordinates.a.y &&
      clickedCoordinates.y <= chosenCharacter.coordinates.c.y
    ) {
      chosenCharacter.isFound = true;
      setGameMessage(`You found ${chosenCharacter.name}!`);
    } else {
      setGameMessage(`That is not ${chosenCharacter.name}!`);
    }

    handleShowGameMessage();
    // console.log("All characters:", game.characters);

    if (checkIfGameOver()) {
      console.log("Game over!");
      game.characters.forEach((character) => {
        character.isFound = false;
      });
      stopTimer();
      setIsGameOver(true);
      setHasGameStarted(false);
      setGameMessage("");
    }
  };

  if (isGameOver) {
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ flexGrow: 1 }}
      >
        <GameOverModal
          time={utils.formatTime(time)}
          startNewGame={startNewGame}
        />
      </main>
    );
  }

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
        id="game-canvas"
        className="mt-[120px] flex-grow flex justify-center items-start bg-red-500"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseMove={moveAimCursor}
        onClick={handleCanvasClick}
      >
        <img
          id="game-image"
          src={`${baseUrl}/games/${game.id}/image`}
          alt="Game"
        />
        {showAimCursor && <AimCursor aimCordinates={aimCordinates} />}
        {showDropdown && (
          <DropDownMenu
            dropDownCoordinates={dropDownCoordinates}
            gameCharacters={game.characters}
            handleDropDownClick={handleDropDownClick}
          />
        )}
        {showGameMessage && <GameMessageDisplay gameMessage={gameMessage} />}
      </div>
    </>
  );
};

export default Game;
