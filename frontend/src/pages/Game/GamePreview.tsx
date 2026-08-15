import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import GameCharacter from "./GameCharacter";
import { BASE_URL } from "../../../config";
import type { GameDetails } from "../../types";

const PLACEHOLDER_COUNT = 4;
const placeholders = Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => ({
  id: index + 1,
}));

const GamePreviewSkeleton = () => (
  <motion.div
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="flex h-screen w-full items-center justify-center"
  >
    <div className="fixed inset-0 flex items-center justify-start p-4 sm:p-16">
      <section className="flex w-full max-w-3xl flex-col gap-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="animate-shimmer h-7 w-40 rounded-lg bg-linear-to-r from-red-700 via-red-600/70 to-red-700 bg-size-[200%_100%] sm:h-8"></div>
            <div className="animate-shimmer h-7 w-20 rounded-lg bg-linear-to-r from-slate-700 via-slate-600/70 to-slate-700 bg-size-[200%_100%] shadow-lg"></div>
          </div>

          <div className="xss:min-h-30 xs:min-h-26 min-h-39 md:min-h-24">
            <div className="flex grow flex-col gap-1">
              <div className="animate-shimmer xxs:hidden h-5.5 rounded-lg bg-linear-to-r from-slate-100 via-slate-50/70 to-slate-100 bg-size-[200%_100%] shadow-lg"></div>
              <div className="animate-shimmer xs:hidden h-5.5 rounded-lg bg-linear-to-r from-slate-100 via-slate-50/70 to-slate-100 bg-size-[200%_100%] shadow-lg"></div>
              <div className="animate-shimmer h-5.5 rounded-lg bg-linear-to-r from-slate-100 via-slate-50/70 to-slate-100 bg-size-[200%_100%] shadow-lg sm:hidden"></div>
              <div className="animate-shimmer h-5.5 rounded-lg bg-linear-to-r from-slate-100 via-slate-50/70 to-slate-100 bg-size-[200%_100%] shadow-lg"></div>
              <div className="animate-shimmer h-5.5 rounded-lg bg-linear-to-r from-slate-100 via-slate-50/70 to-slate-100 bg-size-[200%_100%] shadow-lg"></div>
              <div className="animate-shimmer h-5.5 rounded-lg bg-linear-to-r from-slate-100 via-slate-50/70 to-slate-100 bg-size-[200%_100%] shadow-lg"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 sm:gap-8">
          {placeholders.map((placeholder) => (
            <div
              key={placeholder.id}
              className="flex flex-col items-center gap-2"
            >
              <div className="animate-shimmer h-16.5 w-16.5 rounded-lg border border-slate-50/20 bg-linear-to-r from-slate-100/10 via-slate-50/10 to-slate-100/10 bg-size-[200%_100%] p-2 shadow-lg backdrop-blur-sm sm:h-20.5 sm:w-20.5"></div>
              <div className="animate-shimmer h-5 w-14 rounded-lg bg-linear-to-r from-slate-100 via-slate-50/70 to-slate-100 bg-size-[200%_100%] shadow-lg sm:h-5.5 sm:w-16"></div>
            </div>
          ))}
        </div>

        <div className="flex max-w-96 gap-4 text-white">
          <div className="animate-shimmer flex h-8 w-38 grow items-center justify-center rounded-lg bg-linear-to-r from-slate-600 via-slate-500/70 to-slate-600 bg-size-[200%_100%] shadow-[3px_3px_0px_0px] shadow-slate-950 sm:h-10">
            <div className="animate-shimmer h-4 w-12 rounded-lg bg-linear-to-r from-white via-white/70 to-white bg-size-[200%_100%] shadow-lg sm:h-5 sm:w-16"></div>
          </div>
          <div className="animate-shimmer flex h-8 w-42 grow items-center justify-center rounded-lg bg-linear-to-r from-red-700 via-red-600/70 to-red-700 bg-size-[200%_100%] shadow-[3px_3px_0px_0px] shadow-slate-950 sm:h-10">
            <div className="animate-shimmer h-4 w-12 rounded-lg bg-linear-to-r from-white via-white/70 to-white bg-size-[200%_100%] shadow-lg sm:h-5 sm:w-20"></div>
          </div>
        </div>
      </section>
    </div>
  </motion.div>
);

const GamePreviewContent = ({
  game,
  handleStartGame,
}: {
  game: GameDetails;
  handleStartGame: () => void;
}) => {
  const { title, difficulty, description, characters, image } = game;

  const difficultyColor = {
    easy: "bg-green-700/50 text-green-200",
    medium: "bg-yellow-700/50 text-yellow-200",
    hard: "bg-red-700/50 text-red-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ backgroundImage: `url(${BASE_URL}/images/games/${image})` }}
      className="flex h-screen w-full items-center justify-center bg-cover bg-center"
    >
      <div className="fixed inset-0 flex items-center justify-start bg-black/60 p-4 backdrop-blur-sm sm:p-16">
        <section className="flex w-full max-w-3xl flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="font-title text-3xl font-bold text-red-600 sm:text-4xl">
                {title}
              </h1>
              <p
                className={`w-fit rounded-lg px-1.5 py-1 text-sm font-medium shadow-lg ${difficultyColor[difficulty]}`}
              >
                {difficulty[0].toUpperCase() + difficulty.slice(1)}
              </p>
            </div>

            <div className="xss:min-h-30 xs:min-h-26 min-h-39 md:min-h-24">
              <p className="text-base leading-relaxed font-medium text-slate-50">
                {description}
              </p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-8">
            {characters.map((character) => (
              <GameCharacter key={character.id} character={character} />
            ))}
          </div>

          <div className="flex max-w-96 gap-4 text-white">
            <Link
              to="/"
              className="grow rounded-lg bg-slate-500 py-1.5 text-center text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-slate-600 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
            >
              Go Back
            </Link>
            <button
              onClick={handleStartGame}
              className="grow cursor-pointer rounded-lg bg-red-600 py-1.5 text-center text-sm font-bold shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-red-700 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none sm:py-2 sm:text-base"
            >
              Play Game
            </button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const GamePreview = ({
  game,
  handleStartGame,
}: {
  game: GameDetails | null;
  handleStartGame: () => void;
}) => (
  <AnimatePresence mode="sync">
    <div className="fixed inset-0 backdrop-blur-sm" />
    {!game ? (
      <GamePreviewSkeleton key="skeleton" />
    ) : (
      <GamePreviewContent
        key="preview"
        game={game}
        handleStartGame={handleStartGame}
      />
    )}
  </AnimatePresence>
);

export default GamePreview;
