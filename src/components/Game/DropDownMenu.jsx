const DropDownMenu = ({
  dropDownCoordinates,
  gameCharacters,
  handleDropDownClick,
}) => {
  return (
    <div
      style={{
        left: `${dropDownCoordinates.x}px`,
        top: `${dropDownCoordinates.y}px`,
      }}
      className="absolute p-4 flex flex-col justify-center items-center bg-slate-800 rounded-xl text-slate-100 z-10"
    >
      <ul>
        {gameCharacters.map(
          (character) =>
            !character.isFound && (
              <li key={character.id} className="my-2">
                <button
                  id={character.id}
                  className="w-full p-2 flex justify-start items-center rounded-xl ext-xl font-semibold hover:bg-slate-900 transition"
                  onClick={handleDropDownClick}
                >
                  {character.name}
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default DropDownMenu;
