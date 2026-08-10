import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import type { GameCardData, Game } from "../../types";
import { BASE_URL } from "../../../config";

const GameContent = ({ game }: { game: Game }) => {
  const { id, title, image } = game;

  return (
    <Link
      to={`/games/${id}`}
      className="h-full p-2"
      data-testid={`game-card-${id}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex h-full grow flex-col gap-2"
      >
        <img
          loading="lazy"
          alt={title}
          src={`${BASE_URL}/images/games/${image}`}
          className="grow rounded-lg object-cover transition-all duration-300 ease-in-out group-hover:brightness-50"
        />
        <h2 className="font-title text-center text-3xl text-red-600 transition-colors duration-300 ease-in-out group-hover:text-red-500">
          {title}
        </h2>
      </motion.div>
    </Link>
  );
};

const GameCardSkeleton = () => (
  <motion.div
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="flex h-full grow flex-col items-center gap-2 p-2"
  >
    <div className="animate-shimmer w-full grow rounded-lg bg-linear-to-r from-slate-700 via-slate-600/70 to-slate-700 bg-size-[200%_100%]" />
    <div className="animate-shimmer max-h-10 w-full max-w-3xs grow rounded-lg bg-linear-to-r from-slate-700 via-slate-600/70 to-slate-700 bg-size-[200%_100%]" />
  </motion.div>
);

const GameCard = ({ game }: { game: GameCardData }) => {
  const isPlaceholder = "isPlaceholder" in game;

  return (
    <div
      className={`group flex min-h-100 items-center justify-center rounded-lg border border-slate-600/40 bg-slate-600/20 shadow-lg backdrop-blur-sm ${!isPlaceholder && "transition-all duration-300 ease-in-out hover:-translate-y-1"}`}
    >
      <AnimatePresence mode="wait">
        {isPlaceholder ? (
          <GameCardSkeleton key="skeleton" />
        ) : (
          <GameContent key="card" game={game} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCard;
