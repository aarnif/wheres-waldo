import baseUrl from "../../../baseUrl";
import utils from "../../utils";
import gameService from "../../services/gameService";

import GameOverModal from "./GameOverModal";
import GameStartModal from "./GameStartModal";
import GameHeader from "./GameHeader";
import GameMessageDisplay from "./GameMessageDisplay";
import AimCursor from "./AimCursor";
import DropDownMenu from "./DropDownMenu";
import GameMark from "./GameMark";

import rightPick from "../../sounds/right_pick.mp3";
import wrongPick from "../../sounds/wrong_pick.mp3";

import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

const Game = ({ user, setUser, currentGame, setGames }) => {
  const navigate = useNavigate();

  const timer = useRef(0);

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
  const [playSound, setPlaySound] = useState(true);

  const [rightPickSound] = useSound(rightPick, {
    volume: playSound ? 0.25 : 0,
  });

  const [wrongPickSound] = useSound(wrongPick, {
    volume: playSound ? 0.25 : 0,
  });

  const timeUnit = 10;
  const gameMessageDuration = 1000;
  const gameHeaderElement = document.getElementById("game-header");
  const gameImageElement = document.getElementById("game-image");
  const imageUrl = `${baseUrl}/games/${game.id}/image`;

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
    navigate("/");
  };

  const handleCanvasClick = (event) => {
    const normalisedX = (event.pageX / gameImageElement.offsetWidth).toFixed(3);
    const normalisedY = (
      (event.pageY - gameHeaderElement.offsetHeight) /
      gameImageElement.offsetHeight
    ).toFixed(3);
    console.log("Normalised coordinates:", normalisedX, normalisedY);
    setShowDropdown(!showDropdown);
    setDropDownCoordinates({ x: event.pageX, y: event.pageY });
    setClickedCoordinates({ x: Number(normalisedX), y: Number(normalisedY) });
    setGameMarkCoordinates({
      x: event.pageX,
      y: event.pageY,
    });
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
        playedGames: prevState.playedGames.concat(response.id),
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
          x: gameMarkCoordinates.x,
          y: gameMarkCoordinates.y,
        },
      ]);
    } else {
      wrongPickSound();
      setGameMessage(`That is not ${chosenCharacter.character.name}!`);
    }

    handleShowGameMessage();

    if (checkIfGameOver()) {
      console.log("Game over!");
      stopTimer();
      setIsGameOver(true);
      setHasGameStarted(false);
      updateLeaderboard();
    }
  };

  if (isGameOver) {
    return (
      <main
        className="d-flex justify-content-center align-items-center"
        style={{ flexGrow: 1 }}
      >
        <GameOverModal
          game={game}
          time={utils.formatTime(time)}
          startNewGame={startNewGame}
          handleChangeGame={handleChangeGame}
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

  // console.log("Game image element:", gameImageElement);

  return (
    <>
      <GameHeader
        game={game}
        time={utils.formatTime(time)}
        handleChangeGame={handleChangeGame}
      />
      <div
        id="game-canvas"
        style={{ backgroundColor: game.colorTheme.gameCanvas }}
        className="mt-[120px] flex-grow flex justify-center items-start bg-zinc-600"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseMove={moveAimCursor}
        onClick={handleCanvasClick}
      >
        <img id="game-image" src={imageUrl} alt="Game" />
        {showAimCursor && (
          <AimCursor
            gameHeaderElement={gameHeaderElement}
            gameImageElement={gameImageElement}
            imageUrl={imageUrl}
            aimCordinates={aimCordinates}
          />
        )}
        {showDropdown && (
          <DropDownMenu
            game={game}
            dropDownCoordinates={dropDownCoordinates}
            handleDropDownClick={handleDropDownClick}
          />
        )}
        {gameMarks.map((mark, index) => (
          <GameMark key={index} aimCordinates={mark} />
        ))}
        <AnimatePresence mode="wait">
          {showGameMessage && (
            <GameMessageDisplay
              colorTheme={game.colorTheme}
              gameMessage={gameMessage}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Game;
