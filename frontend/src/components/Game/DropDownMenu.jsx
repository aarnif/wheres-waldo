import { useState } from "react";

const DropDownMenuItem = ({ game, character, handleDropDownClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li key={character.id} className="my-2">
      <button
        id={character.id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered
            ? game.colorTheme.dropDownMenuItemHover
            : game.colorTheme.dropDownMenuItem,
        }}
        className="w-full p-2 flex justify-start items-center rounded-xl ext-xl font-semibold hover:bg-slate-900 transition"
        onClick={handleDropDownClick}
      >
        {character.character.name}
      </button>
    </li>
  );
};

const DropDownMenu = ({ game, dropDownCoordinates, handleDropDownClick }) => {
  return (
    <div
      style={{
        left: `${dropDownCoordinates.x}px`,
        top: `${dropDownCoordinates.y}px`,
        backgroundColor: game.colorTheme.dropDownMenu,
      }}
      className="absolute p-4 flex flex-col justify-center items-center bg-slate-800 rounded-xl text-slate-100 z-10"
    >
      <ul>
        {game.characters.map(
          (character) =>
            !character.isFound && (
              <DropDownMenuItem
                key={character.id}
                game={game}
                character={character}
                handleDropDownClick={handleDropDownClick}
              />
            )
        )}
      </ul>
    </div>
  );
};

export default DropDownMenu;
