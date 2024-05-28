import baseUrl from "../../../baseUrl";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";

const GameCharacter = ({ gameId, character }) => {
  return (
    <div className="m-4 flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(${baseUrl}/games/${gameId}/characters/${character.id}/image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-[100px] h-[100px] bg-red-400 rounded-xl"
      ></div>
      <h3 className="mt-2 w-[100px] h-[100px] flex justify-center items-start text-xl font-bold text-center">
        {character.name}
      </h3>
    </div>
  );
};

const GameImage = ({ gameId }) => {
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
          backgroundImage: `url(${baseUrl}/games/${gameId}/image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-[600px] bg-red-400 rounded-xl"
      ></motion.div>
    </AnimatePresence>
  );
};

const GameContent = ({ game }) => {
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
          Difficulty: Medium
        </h3>
        <h2 className="mt-16 mb-2 flex-grow w-full text-2xl font-bold text-center">
          Find the following characters:
        </h2>
      </div>
      <div className="flex-grow w-full flex justify-center items-start">
        {game.characters.map((character) => (
          <GameCharacter
            key={character.id}
            gameId={game.id}
            character={character}
          />
        ))}
      </div>
    </motion.div>
  );
};

const GameCard = ({ game, gameStyleColors }) => {
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

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: gameStyleColors.background,
      }}
      className="flex-grow min-h-[600px] p-16 flex justify-center items-center text-white"
    >
      <AnimatePresence mode="wait">
        {isInView && (
          <motion.button
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
                ? gameStyleColors.hover
                : gameStyleColors.gameCard,
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex-grow max-w-[1400px] p-8 flex justify-between items-center rounded-xl shadow-xl"
          >
            <div className="flex-grow min-h-[600px] flex justify-between items-center">
              <div className="flex-grow basis-2/5 min-h-[600px]">
                <GameContent game={game} />
              </div>
              <div className="flex-grow basis-3/5 min-h-[600px]">
                <GameImage gameId={game.id} />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCard;
