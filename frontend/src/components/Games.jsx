import { useNavigate } from "react-router-dom";

import baseUrl from "../../baseUrl.js";
import GameCharacter from "./GameCharacter.jsx";

const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const { id, title, characters } = game;

  const imageUrl = `${baseUrl}/games/${id}/image`;
  return (
    <button
      onClick={() => navigate(`/games/${id}`)}
      className="relative w-full max-w-[500px] aspect-[4/5] rounded-lg shadow-md bg-slate-300 cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="opacity-0 hover:opacity-100 absolute inset-0 p-12 flex flex-col justify-between bg-black/50 text-white rounded-lg transition-all duration-300 ease-in-out">
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
    </button>
  );
};

const Games = ({ games }) => {
  return (
    <div className="py-16 w-full max-w-[1800px] flex-grow flex justify-center items-center flex-wrap gap-16">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Games;
