import baseUrl from "../../../baseUrl";
import utils from "../../utils";
import gameService from "../../services/gameService";

import GameOverModal from "./GameOverModal";
import GameStartModal from "./GameStartModal";
import GameMessageDisplay from "./GameMessageDisplay";
import AimCursor from "./AimCursor";
import DropDownMenu from "./DropDownMenu";
import GameMark from "./GameMark";

import rightPick from "../../sounds/right_pick.mp3";
import wrongPick from "../../sounds/wrong_pick.mp3";

import useSound from "use-sound";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import useResponsiveWidth from "../../hooks/useResponsiveWidth";
import GameHeader from "./GameHeader";

const GameView = ({ user, setUser, currentGame, setGames, handleEndGame }) => {
  const timer = useRef(0);

  const { width, height } = useResponsiveWidth();
  const [time, setTime] = useState(timer.current);

  const [game, setGame] = useState(currentGame);
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
  const [gameMarkCoordinates, setGameMarkCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [gameMarks, setGameMarks] = useState([]);
  const [playSound] = useState(true);

  const [rightPickSound] = useSound(rightPick, {
    volume: playSound ? 0.25 : 0,
  });

  const [wrongPickSound] = useSound(wrongPick, {
    volume: playSound ? 0.25 : 0,
  });

  const timeUnit = 10;
  const gameMessageDuration = 1000;
  const gameCanvasElement = document.getElementById("game-canvas");
  const imageUrl = `${baseUrl}/games/${game.id}/image`;

  // Calculate responsive canvas dimensions based on screen size and image aspect ratio
  const calculateCanvasDimensions = () => {
    const imageAspectRatio = 5120 / 2880;
    const screenAspectRatio = width / height;

    // Determine which dimension should fill the screen
    const shouldFillHeight = imageAspectRatio >= screenAspectRatio;

    let containerWidth, containerHeight;

    if (shouldFillHeight) {
      // Fill height, calculate width based on aspect ratio
      containerHeight = height;
      containerWidth = height * imageAspectRatio;
    } else {
      // Fill width, calculate height based on aspect ratio
      containerWidth = width;
      containerHeight = width / imageAspectRatio;
    }

    const widthInVw = (containerWidth / width) * 100;
    const heightInVh = (containerHeight / height) * 100;

    return {
      width: `${widthInVw}vw`,
      height: `${heightInVh}vh`,
      shouldFillHeight,
      containerWidth,
      containerHeight,
    };
  };

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime((time) => time + 1);
    }, timeUnit);
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
    resetGame();
    setHasGameStarted(true);
    setIsGameOver(false);
    startTimer();
  };

  const resetGame = () => {
    console.log("Reset game");
    const resetGameCharacters = game.characters.map((character) => {
      return {
        ...character,
        isFound: false,
      };
    });
    resetTimer();
    setGame((prevState) => ({ ...prevState, characters: resetGameCharacters }));
    setGameMarks([]);
    setGameMessage("");
    setShowAimCursor(false);
  };

  const handleChangeGame = () => {
    console.log("Change game");
    resetGame();
    handleEndGame();
  };

  const handleCanvasClick = (event) => {
    const scrollContainer = event.currentTarget;
    const canvasElement = document.getElementById("game-canvas");

    // Get the scroll offsets
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollTop = scrollContainer.scrollTop;

    // Get container bounds
    const containerRect = scrollContainer.getBoundingClientRect();

    // Calculate the actual position within the image considering scroll
    const imageX = event.clientX - containerRect.left + scrollLeft;
    const imageY = event.clientY - containerRect.top + scrollTop;

    // Normalize coordinates relative to the full image size
    const normalisedX = (imageX / canvasElement.offsetWidth).toFixed(3);
    const normalisedY = (imageY / canvasElement.offsetHeight).toFixed(3);

    console.log("Normalised coordinates:", normalisedX, normalisedY);
    setShowDropdown(!showDropdown);
    setDropDownCoordinates({ x: event.clientX, y: event.clientY });
    setClickedCoordinates({ x: Number(normalisedX), y: Number(normalisedY) });
    setGameMarkCoordinates({
      x: imageX,
      y: imageY,
    });
  };

  const moveAimCursor = (event) => {
    const scrollContainer = event.currentTarget;
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollTop = scrollContainer.scrollTop;
    const containerRect = scrollContainer.getBoundingClientRect();

    // Calculate position within the image including scroll
    const imageX = event.clientX - containerRect.left + scrollLeft;
    const imageY = event.clientY - containerRect.top + scrollTop;

    setAimCordinates({
      x: imageX,
      y: imageY,
    });
  };

  const handleMouseOver = () => {
    setShowAimCursor(true);
  };

  const handleMouseOut = () => {
    setShowAimCursor(false);
  };

  const checkIfGameOver = () =>
    game.characters.every((character) => character.isFound);

  const handleShowGameMessage = () => {
    setShowGameMessage(true);
    setTimeout(() => {
      setShowGameMessage(false);
    }, gameMessageDuration);
  };

  const updateLeaderboard = () => {
    console.log("Final Score:", time);
    gameService.addScoreToGame(game.id, user, time).then((response) => {
      console.log("Leaderboard updated:");
      setGames((games) =>
        games.map((game) => (game.id === response.id ? response : game))
      );
      setUser((prevState) => ({
        ...prevState,
        playedGames: prevState.playedGames.concat({ game: response }),
      }));
    });
  };

  const handleDropDownClick = (event) => {
    console.log("GameMARKS:", gameMarks);
    const chosenCharacter = game.characters.find(
      (character) => character.id === event.target.id
    );
    console.log("Clicked on character:", chosenCharacter);
    console.log("Clicked coordinates:", clickedCoordinates);

    setShowDropdown(false);

    if (
      clickedCoordinates.x >= chosenCharacter.coordinates.a.x &&
      clickedCoordinates.x <= chosenCharacter.coordinates.b.x &&
      clickedCoordinates.y >= chosenCharacter.coordinates.a.y &&
      clickedCoordinates.y <= chosenCharacter.coordinates.c.y
    ) {
      chosenCharacter.isFound = true;
      rightPickSound();
      setGameMessage(`You found ${chosenCharacter.character.name}!`);
      setGameMarks([
        ...gameMarks,
        {
          x: gameMarkCoordinates.x, // Use the original canvas click position for the mark
          y: gameMarkCoordinates.y,
        },
      ]);
    } else {
      wrongPickSound();
      setGameMessage(`That is not ${chosenCharacter.character.name}!`);
    }

    setAimCordinates({
      x: gameMarkCoordinates.x,
      y: gameMarkCoordinates.y,
    });

    handleShowGameMessage();

    if (checkIfGameOver()) {
      console.log("Game over!");
      stopTimer();
      setIsGameOver(true);
      setHasGameStarted(false);
      updateLeaderboard();
    }
  };

  const canvasDimensions = calculateCanvasDimensions();

  if (isGameOver) {
    return (
      <GameOverModal
        time={utils.formatTime(time)}
        startNewGame={startNewGame}
        handleChangeGame={handleChangeGame}
      />
    );
  }

  if (!hasGameStarted) {
    return (
      <GameStartModal
        game={game}
        startNewGame={startNewGame}
        handleEndGame={handleEndGame}
      />
    );
  }

  return (
    <div className="w-screen h-screen overflow-auto">
      <GameHeader
        game={game}
        time={utils.formatTime(time)}
        handleChangeGame={handleChangeGame}
      />
      <div
        id="game-canvas"
        style={{
          position: "relative",
          height: canvasDimensions.height,
          width: canvasDimensions.width,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
          cursor: showAimCursor ? "none" : "default",
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseMove={moveAimCursor}
        onClick={handleCanvasClick}
      >
        {gameMarks.map((mark, index) => (
          <GameMark key={index} aimCordinates={mark} />
        ))}

        {showAimCursor && (
          <AimCursor
            gameCanvasElement={gameCanvasElement}
            imageUrl={imageUrl}
            aimCordinates={aimCordinates}
          />
        )}
      </div>

      {showDropdown && (
        <DropDownMenu
          game={game}
          dropDownCoordinates={dropDownCoordinates}
          handleDropDownClick={handleDropDownClick}
        />
      )}

      <AnimatePresence mode="wait">
        {showGameMessage && <GameMessageDisplay gameMessage={gameMessage} />}
      </AnimatePresence>
    </div>
  );
};

export default GameView;
