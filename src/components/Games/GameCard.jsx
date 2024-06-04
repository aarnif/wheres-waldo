import baseUrl from "../../../baseUrl";
import GameCharacters from "./GameCharacters";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";

const GameImage = ({ game, user, checkIfUserPlayed }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
          delay: 1.2,
        }}
        viewport={{ once: true }}
        style={{
          opacity: 0,
          x: 50,
          backgroundImage: `url(${baseUrl}/games/${game.id}/image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-[600px] flex justify-center items-center bg-red-400 rounded-xl"
      >
        {checkIfUserPlayed ? (
          <div className="w-full h-full flex flex-col justify-center items-center rounded-xl bg-black bg-opacity-50">
            <h2 className="mb-4 text-5xl font-bold">Completed!</h2>
            <h2 className="text-5xl font-bold">
              Your time:{" "}
              {
                game.leaderboard.find(
                  (entry) => user.username === entry.username
                ).time
              }
            </h2>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center rounded-xl backdrop-blur-sm"></div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const GameContent = ({ game, user, checkIfUserPlayed }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.3,
      }}
      viewport={{ once: true }}
      style={{ opacity: 0, y: -20 }}
      className="flex-grow min-h-[600px] flex flex-col justify-center items-center"
    >
      <div className="flex-grow max-h-[200px] w-full flex flex-col justify-start items-center">
        <h1 className="mt-4 flex-grow w-full text-3xl font-extrabold text-center">
          {game.title.toUpperCase()}
        </h1>
        <h3 className="mb-4 flex-grow w-full text-xl font-bold text-center">
          Difficulty:{" "}
          {game.difficulty[0].toUpperCase() + game.difficulty.slice(1)}
        </h3>
        <h2 className="mt-16 mb-2 flex-grow w-full text-2xl font-bold text-center">
          Find the following characters:
        </h2>
      </div>
      <GameCharacters game={game} location={"gameCard"} />
      <div className="mt-4 flex-grow w-full text-xl font-semibold">
        <h1 className="my-8 text-2xl font-bold">Leader Board:</h1>
        <ul>
          {game.leaderboard.slice(0, 3).map((entry, index) => (
            <li
              key={index}
              style={{
                fontSize: user.username === entry.username && "1.5rem",
                fontWeight: user.username === entry.username && "bold",
              }}
              className="mb-2 text-xl font-semibold"
            >
              {index + 1}.{" "}
              {entry.username === user.username ? "You" : entry.username} -{" "}
              {entry.time}
            </li>
          ))}
          {game.leaderboard.length === 0 && <li>No entries yet.</li>}
        </ul>
      </div>
    </motion.div>
  );
};

const GameCard = ({ user, game }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: "all",
    once: true,
  });

  const handleClick = () => {
    console.log(`Start game titled ${game.title}`);
    navigate(`/games/${game.id}`);
  };

  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);

  const checkIfUserPlayed = game.leaderboard.find(
    (entry) => entry.username === user.username
  );

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: game.colorTheme.gameCardBackground,
      }}
      className="w-full flex-grow min-h-[600px] p-16 flex justify-center items-center text-white"
    >
      <AnimatePresence mode="wait">
        <motion.button
          id={game.title}
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
          }}
          style={{
            opacity: 0,
            y: 50,
            backgroundColor: isHovered
              ? game.colorTheme.gameCardHover
              : game.colorTheme.gameCard,
            transition: "background-color 0.3s ease-in-out",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex-grow max-w-[1400px] min-h-[600px] my-12 p-8 flex justify-between items-center rounded-xl shadow-xl"
        >
          {isInView && (
            <div className="flex-grow min-h-[600px] flex justify-between items-center">
              <div className="flex-grow basis-2/5 min-h-[600px]">
                <GameContent
                  game={game}
                  user={user}
                  checkIfUserPlayed={checkIfUserPlayed}
                />
              </div>
              <div className="flex-grow basis-3/5 min-h-[600px]">
                <GameImage
                  game={game}
                  user={user}
                  checkIfUserPlayed={checkIfUserPlayed}
                />
              </div>
            </div>
          )}
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default GameCard;
