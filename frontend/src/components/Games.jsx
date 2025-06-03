import { useNavigate } from "react-router-dom";

import baseUrl from "../../baseUrl.js";
import helpers from "../../../backend/utils/helpers.js";
import GameCharacter from "./GameCharacter.jsx";

const GameCard = ({ user, game, games }) => {
  const navigate = useNavigate();
  const { id, title, characters, level } = game;

  const { isGameUnlocked, hasUserCompletedGame } = helpers;

  const isUnlocked = isGameUnlocked(game, user, games);
  const isCompleted = hasUserCompletedGame(game, user);

  const imageUrl = `${baseUrl}/games/${id}/image`;

  const handleGameClick = () => {
    if (isUnlocked) {
      navigate(`/games/${id}`);
    }
  };

  return (
    <div
      onClick={handleGameClick}
      disabled={!isUnlocked}
      className={`group relative w-full max-w-[500px] aspect-[4/5] rounded-lg shadow-md bg-slate-300 transition-all duration-200 ${
        isUnlocked
          ? "cursor-pointer hover:scale-105"
          : "cursor-not-allowed opacity-60"
      }`}
    >
      <img
        src={imageUrl}
        alt={title}
        className={`w-full h-full object-cover rounded-lg ${
          !isUnlocked ? "blur-md grayscale" : isCompleted ? "" : "blur-md"
        }`}
      />

      {isUnlocked && !isCompleted && (
        <div className="absolute opacity-100 group-hover:opacity-0 inset-0 flex justify-center items-center rounded-lg">
          <h2 className="px-4 py-1 text-2xl text-slate-50 bg-slate-300/50 rounded-full font-bold">
            Level {level}
          </h2>
        </div>
      )}

      {!isUnlocked && (
        <div className="absolute inset-0 flex flex-col justify-center items-center rounded-lg bg-black/50">
          <div className="text-4xl mb-2">🔒</div>
          <h2 className="text-xl font-bold text-white text-center">
            Complete Level {level - 1} to Unlock
          </h2>
        </div>
      )}

      {isUnlocked && !isCompleted && (
        <div className="opacity-0 group-hover:opacity-100 absolute inset-0 p-12 flex flex-col justify-between bg-black/50 text-white rounded-lg transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex justify-start gap-8">
            {characters?.map((character) => (
              <GameCharacter
                key={character.id}
                gameId={id}
                character={character}
              />
            ))}
          </div>
          <button className="px-7 py-3 shadow-lg border border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 active:border-red-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out">
            Play Game
          </button>
        </div>
      )}

      {isCompleted && isUnlocked && (
        <div className="absolute inset-0 p-12 flex flex-col justify-center items-center rounded-lg bg-black/50 gap-8">
          <h2 className="text-3xl font-bold text-slate-50 font-roboto-condensed">
            Completed!
          </h2>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-50 font-roboto-condensed">
              Your time:
            </h2>
            <h2 className="text-3xl font-bold text-slate-50 font-mono">
              {
                game.leaderboard.find(
                  (entry) => user.username === entry.username
                )?.time
              }
            </h2>
          </div>
          <button className="px-7 py-3 shadow-lg border border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 active:border-red-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const Games = ({ user, games }) => {
  return (
    <div className="py-16 w-full max-w-[1800px] flex-grow flex justify-center items-center flex-wrap gap-16">
      {games.map((game) => (
        <GameCard key={game.id} user={user} game={game} games={games} />
      ))}
    </div>
  );
};

export default Games;
