import { useState, useEffect, useRef } from "react";

const DropDownMenuItem = ({ character, handleDropDownClick }) => (
  <li className="my-2">
    <button
      id={character.id}
      className="w-full p-2 flex justify-start items-center rounded-xl font-semibold hover:bg-slate-900 text-slate-50 transition"
      onClick={handleDropDownClick}
    >
      {character.character.name}
    </button>
  </li>
);

const DropDownMenu = ({ game, dropDownCoordinates, handleDropDownClick }) => {
  const menuRef = useRef(null);
  const [menuCoordinates, setMenuCoordinates] = useState({
    left: dropDownCoordinates.x,
    top: dropDownCoordinates.y,
  });

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }
    const { innerWidth, innerHeight } = window;
    const { offsetWidth: w, offsetHeight: h } = menuRef.current;
    let left = dropDownCoordinates.x;
    let top = dropDownCoordinates.y;

    const menuOverflowsCanvasRight = left + w > innerWidth;
    const menuOverflowsCanvasBottom = top + h > innerHeight;

    if (menuOverflowsCanvasRight) {
      left = dropDownCoordinates.x - w;
    }

    if (menuOverflowsCanvasBottom) {
      top = dropDownCoordinates.y - h;
    }

    setMenuCoordinates({ left, top });
  }, [dropDownCoordinates]);

  return (
    <div
      ref={menuRef}
      style={{
        left: `${menuCoordinates.left}px`,
        top: `${menuCoordinates.top}px`,
      }}
      className="absolute p-4 flex flex-col bg-slate-900/40 rounded-xl text-slate-100 z-10"
    >
      <ul>
        {game.characters.map(
          (character) =>
            !character.isFound && (
              <DropDownMenuItem
                key={character.id}
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
