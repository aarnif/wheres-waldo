import baseUrl from "../../../baseUrl";

const GameCharacter = ({ gameId, character, location }) => {
  const classStylesName = {
    gameCard:
      "mt-2 w-[100px] h-[100px] flex justify-center items-start text-xl font-bold text-center",
    header:
      "mt-2 w-[200px] h-[20px] flex justify-center items-start text-lg font-bold text-center",
    modal:
      "mt-2 w-[100px] h-[100px] flex justify-center items-start text-xl font-bold text-center",
  };

  const classStylesImage = {
    gameCard: "w-[100px] h-[100px] bg-red-400 rounded-xl",
    header: "w-[70px] h-[70px] bg-red-400 rounded-xl",
    modal: "w-[100px] h-[100px] bg-red-400 rounded-xl",
  };

  return (
    <div
      style={{ opacity: character.isFound ? 0.4 : 1 }}
      className="m-4 flex flex-col items-center"
    >
      <div
        style={{
          backgroundImage: `url(${baseUrl}/games/${gameId}/characters/${character.id}/image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={classStylesImage[location]}
      ></div>
      <h3 className={classStylesName[location]}>{character.name}</h3>
    </div>
  );
};

const GameCharacters = ({ game, location }) => {
  const classStyles = {
    gameCard: "flex-grow w-full flex justify-center items-start",
    header: "flex-grow w-full flex justify-center items-center",
    modal: "flex-grow w-full flex justify-center items-center",
  };

  return (
    <div className={classStyles[location]}>
      {game.characters.map((character) => (
        <GameCharacter
          key={character.id}
          gameId={game.id}
          character={character}
          location={location}
        />
      ))}
    </div>
  );
};

export default GameCharacters;
