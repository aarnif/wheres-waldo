import { useEffect, useRef, useState } from "react";
import type { GameDetails, FoundCharacter } from "../../types";
import GameStart from "./GameStart";
import { BASE_URL } from "../../../config";
import useCanvasDimensions from "../../hooks/useCanvasDimensions";
import { formatTime } from "../../helpers/time";
import { addGameScore } from "../../helpers/localGameScores";
import GameHeader from "./GameHeader";
import GameFooter from "./GameFooter";
import { AnimatePresence } from "motion/react";
import { submitGameScore } from "../../services/games";
import AimCursor from "./AimCursor";
import GameMark from "./GameMark";
import GameEnd from "./GameEnd";
import useAuth from "../../hooks/useAuth";

const GAME_MESSAGE_DURATION = 3000;

const GameView = ({
  game,
  handleCancelGame,
}: {
  game: GameDetails;
  handleCancelGame: () => void;
}) => {
  const { user } = useAuth();
  const gameCanvasRef = useRef<HTMLDivElement | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [showAimCursor, setShowAimCursor] = useState(false);
  const [aimCoordinates, setAimCoordinates] = useState({ x: 0, y: 0 });
  const [gameMarks, setGameMarks] = useState<{ x: number; y: number }[]>([]);
  const [showFooter, setShowFooter] = useState(false);
  const {
    title,
    characters,
    image,
    width: imageWidth,
    height: imageHeight,
  } = game;

  const [foundCharacters, setFoundCharacters] = useState<FoundCharacter[]>(
    characters.map((character) => ({
      ...character,
      found: false,
    })),
  );

  const canvasDimensions = useCanvasDimensions({
    width: imageWidth,
    height: imageHeight,
  });

  useEffect(() => {
    if (checkIfGameOver()) {
      handleEndGame();
    }
  }, [foundCharacters]);

  const handleStartGame = () => {
    setGameStart(false);
    startTimer();
  };

  const handleEndGame = () => {
    stopTimer();
    if (user)
      submitGameScore(String(game.id), time).catch((error) =>
        console.error(error.message),
      );
    else {
      addGameScore({ id: game.id, time });
    }
    setGameEnd(true);
  };

  const handleStartAgain = () => {
    resetTimer();
    setFoundCharacters(
      characters.map((character) => ({
        ...character,
        found: false,
      })),
    );
    setGameMarks([]);
    handleStartGame();
    setGameEnd(false);
  };

  const startTimer = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current!);
    }, 10);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    startTimeRef.current = null;
    setTime(0);
  };

  const handleMouseOver = () => {
    setShowAimCursor(true);
  };

  const handleMouseOut = () => {
    setShowAimCursor(false);
  };

  const handleMoveAimCursor = (event: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();

    setAimCoordinates({
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top,
    });
  };

  const checkIfClickIsOnCharacter = (xPercent: number, yPercent: number) => {
    const foundCharacter = foundCharacters.find((character) => {
      const { x, y, width, height, found } = character;
      return (
        !found &&
        xPercent >= x &&
        xPercent <= x + width &&
        yPercent >= y &&
        yPercent <= y + height
      );
    });
    return foundCharacter;
  };

  const checkIfGameOver = () =>
    foundCharacters.every((character) => character.found);

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();

    const xPercent = (event.clientX - containerRect.left) / containerRect.width;
    const yPercent = (event.clientY - containerRect.top) / containerRect.height;

    const foundCharacter = checkIfClickIsOnCharacter(xPercent, yPercent);

    if (foundCharacter) {
      setFoundCharacters((prevFoundCharacters) =>
        prevFoundCharacters.map((character) =>
          character.id === foundCharacter.id
            ? { ...character, found: true }
            : character,
        ),
      );
      setGameMarks((prevMarks) => [...prevMarks, { x: xPercent, y: yPercent }]);
      handleShowFooter();
    }
  };

  const handleShowFooter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowFooter(true);
    timeoutRef.current = setTimeout(() => {
      setShowFooter(false);
    }, GAME_MESSAGE_DURATION);
  };

  return (
    <div className="h-screen w-screen overflow-auto">
      {!gameStart && (
        <GameHeader
          title={title}
          time={formatTime(time)}
          handleCancelGame={handleCancelGame}
        />
      )}
      <div
        id="game-canvas"
        ref={gameCanvasRef}
        className={`relative ${showAimCursor ? "cursor-none" : "cursor-default"}`}
        style={{
          height: canvasDimensions.height,
          width: canvasDimensions.width,
          backgroundImage: `url(${BASE_URL}/images/games/${image})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
        }}
        onClick={handleCanvasClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onMouseMove={handleMoveAimCursor}
      >
        {gameMarks.map((mark, index) => (
          <GameMark key={index} coordinates={mark} />
        ))}
        {showAimCursor && (
          <AimCursor
            gameCanvasElement={gameCanvasRef.current}
            image={image}
            aimCoordinates={aimCoordinates}
          />
        )}
      </div>

      {gameStart && (
        <GameStart
          title={title}
          characters={characters}
          handleCancelGame={handleCancelGame}
          handleStartGame={handleStartGame}
        />
      )}

      {gameEnd && (
        <GameEnd time={formatTime(time)} handleStartAgain={handleStartAgain} />
      )}

      <AnimatePresence>
        {showFooter && <GameFooter foundCharacters={foundCharacters} />}
      </AnimatePresence>
    </div>
  );
};

export default GameView;
