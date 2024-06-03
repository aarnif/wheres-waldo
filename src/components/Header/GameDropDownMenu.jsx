import { useNavigate } from "react-router-dom";

const GameDropDownMenuItem = ({ game, setShowDropdown }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`Navigating to game ${game.title}`);
    setShowDropdown(false);
    navigate(`/#${game.title}`);
  };

  return (
    <li key={game.id} className="w-full my-2">
      <button
        onClick={handleClick}
        className="w-full p-2 flex justify-center items-center rounded-xl text-xl font-semibold hover:bg-zinc-800 transition"
      >
        {game.title}
      </button>
    </li>
  );
};

const GameDropDownMenu = ({ games, setShowDropdown }) => {
  return (
    <div className="absolute top-[70px] flex-grow w-[200px] p-4 flex flex-col justify-center items-center bg-zinc-700 rounded-xl text-slate-100 z-10">
      <ul className="flex-grow w-full">
        {games.map((game) => (
          <GameDropDownMenuItem
            key={game.id}
            game={game}
            setShowDropdown={setShowDropdown}
          />
        ))}
      </ul>
    </div>
  );
};

export default GameDropDownMenu;
