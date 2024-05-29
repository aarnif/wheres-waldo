const DropDownMenu = ({ dropDownCoordinates, gameCharacters }) => {
  return (
    <div
      style={{
        left: `${dropDownCoordinates.x}px`,
        top: `${dropDownCoordinates.y}px`,
      }}
      className="absolute p-4 flex flex-col justify-center items-center bg-slate-800 rounded-xl text-slate-100 z-10"
    >
      <ul>
        {gameCharacters.map((character) => (
          <li key={character.id} className="my-2">
            <button className="w-full p-2 flex justify-start items-center rounded-xl hover:bg-slate-900 transition">
              <h3 className="text-xl font-semibold">{character.name}</h3>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
