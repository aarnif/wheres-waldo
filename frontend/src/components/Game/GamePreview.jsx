import { useNavigate } from "react-router-dom";

import baseUrl from "../../../baseUrl";
import GameCharacter from "../GameCharacter.jsx";

const GamePreview = ({ currentGame, handleStartGame }) => {
  const navigate = useNavigate();
  const { title, difficulty, description, characters, id } = currentGame;
  const imageUrl = `${baseUrl}/games/${id}/image`;

  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={`w-full h-screen flex justify-center items-center bg-cover bg-center animate-fade-in`}
    >
      <div className="fixed inset-0 p-16 flex justify-start items-center bg-black bg-opacity-60 backdrop-blur-sm">
        <section className="w-full max-w-3xl flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-50 text-3xl font-bold font-roboto-condensed tracking-wide">
                {title}
              </h1>
              <p className="px-1.5 py-1 bg-slate-300/50 rounded-lg w-fit text-slate-100 text-sm font-medium shadow-lg">
                {difficulty}
              </p>
            </div>

            <p className="text-slate-50 text-base font-medium leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex justify-start gap-8">
            {characters?.map((character) => (
              <GameCharacter
                key={character.id}
                gameId={id}
                character={character}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-7 py-3 shadow-lg border border-slate-600 bg-slate-600 hover:bg-slate-700 hover:border-slate-700 active:border-slate-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out"
            >
              Go Back
            </button>

            <button
              onClick={handleStartGame}
              className="px-7 py-3 shadow-lg border border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 active:border-red-800 active:inset-shadow-sm rounded-2xl text-white text-base font-bold transition-all duration-200 ease-in-out"
            >
              Play Game
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GamePreview;
