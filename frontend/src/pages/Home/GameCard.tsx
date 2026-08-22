import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import type {
  GameCardData,
  Game,
  LeaderboardEntry as LeaderboardEntryType,
} from "../../types";
import useAuth from "../../hooks/useAuth";
import { BASE_URL } from "../../../config";
import { getGameScores } from "../../helpers/localGameScores";
import { formatTime } from "../../helpers/time";

const LeaderboardEntry = ({
  entry,
  rank,
  isCurrentUser,
}: {
  entry: LeaderboardEntryType;
  rank: number;
  isCurrentUser: boolean;
}) => {
  const { time, user } = entry;

  return (
    <li
      className={`relative flex items-center justify-center text-lg sm:text-xl ${isCurrentUser ? "font-extrabold text-white" : "font-semibold text-slate-200"}`}
    >
      <p className="absolute left-2 sm:left-4 md:left-8">{rank}.</p>
      <p
        className={`font-mono ${isCurrentUser ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}
      >
        {formatTime(time)}
      </p>
      <p className="absolute right-2 sm:right-4 md:right-8">{user.username}</p>
    </li>
  );
};

const GameContent = ({
  game,
  showLeaderboard,
}: {
  game: Game;
  showLeaderboard: boolean;
}) => {
  const { user: currentUser } = useAuth();
  const { id, title, image, gameScores } = game;

  const currentUserEntry = gameScores.find(
    (entry) => entry.user.id === currentUser?.id,
  );
  const currentUserRank = currentUserEntry
    ? gameScores.indexOf(currentUserEntry) + 1
    : null;
  const userInTopFive = currentUserRank !== null && currentUserRank <= 5;

  const userGameScore = currentUserEntry
    ? currentUserEntry
    : getGameScores().find((entry) => entry.id === id);

  return (
    <Link
      to={`/games/${id}`}
      className="h-full w-full p-2"
      data-testid={`game-card-${id}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex h-full grow flex-col gap-2"
      >
        <div
          className={`relative flex h-full grow transition-all duration-500 ease-in-out transform-3d ${showLeaderboard ? "rotate-y-180" : ""}`}
        >
          <div className="absolute inset-0 flex flex-col backface-hidden">
            <img
              loading="lazy"
              alt={title}
              src={`${BASE_URL}/images/games/${image}`}
              className="grow rounded-lg object-cover transition-all duration-300 ease-in-out group-hover:brightness-50"
            />
            {userGameScore && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/70">
                <div className="flex flex-col gap-2">
                  <p className="text-center text-lg font-bold text-white sm:text-xl">
                    Your Time:
                  </p>
                  <p
                    data-testid="user-game-time"
                    className="text-center text-2xl font-extrabold text-white sm:text-3xl"
                  >
                    {formatTime(userGameScore.time)}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-0 flex rotate-y-180 flex-col rounded-lg bg-slate-600/20 p-2 transition-all duration-300 ease-in-out backface-hidden group-hover:bg-slate-700/20">
            <ul className="flex grow flex-col gap-4 pt-8 sm:pt-12">
              {gameScores.slice(0, 5).map((entry, index) => {
                const { id, user } = entry;
                const isCurrentUser = user.id === currentUser?.id;
                return (
                  <LeaderboardEntry
                    key={id}
                    entry={entry}
                    rank={index + 1}
                    isCurrentUser={isCurrentUser}
                  />
                );
              })}
              {currentUserEntry && !userInTopFive && (
                <>
                  <li
                    key="divider"
                    className="mx-8 flex items-center justify-center border-t border-dashed text-xl font-semibold text-slate-200"
                  ></li>
                  <LeaderboardEntry
                    key={currentUserEntry.id}
                    entry={currentUserEntry}
                    rank={currentUserRank!}
                    isCurrentUser={true}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
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

const GameCard = ({
  game,
  showLeaderboard,
}: {
  game: GameCardData;
  showLeaderboard: boolean;
}) => {
  const isPlaceholder = "isPlaceholder" in game;

  return (
    <div
      className={`group flex min-h-100 items-center justify-center rounded-lg border border-slate-600/40 bg-slate-600/20 shadow-lg backdrop-blur-sm ${!isPlaceholder && "transition-all duration-300 ease-in-out hover:-translate-y-1"}`}
    >
      <AnimatePresence mode="wait">
        {isPlaceholder ? (
          <GameCardSkeleton key="skeleton" />
        ) : (
          <GameContent
            key="card"
            game={game}
            showLeaderboard={showLeaderboard}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameCard;
