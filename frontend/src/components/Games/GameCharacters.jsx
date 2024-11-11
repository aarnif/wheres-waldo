import baseUrl from "../../../baseUrl";

import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";

const GameCharacter = ({
  gameId,
  character,
  location,
  iconBackgroundColor,
}) => {
  const classStylesName = {
    gameCard:
      "mt-2 w-[100px] h-[20px] flex justify-center items-start text-xl font-bold text-center",
    header:
      "mt-2 w-[200px] h-[20px] flex justify-center items-start text-lg font-bold text-center",
    modal:
      "mt-2 w-[100px] h-[100px] flex justify-center items-start text-xl font-bold text-center",
  };

  const classStylesImage = {
    gameCard: "w-[100px] h-[100px] rounded-xl",
    header: "w-[70px] h-[70px] rounded-xl",
    modal: "w-[100px] h-[100px] rounded-xl",
  };

  return (
    <div className="m-4 flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(${baseUrl}/games/${gameId}/characters/${character.id}/image)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: iconBackgroundColor,
          opacity: character.isFound ? 0.4 : 1,
        }}
        className={classStylesImage[location]}
      ></div>
      <h3
        className={classStylesName[location]}
        style={{ opacity: character.isFound ? 0.4 : 1 }}
      >
        {character.character.name}
      </h3>
      {character.isFound && (
        <Icon
          path={mdiCheck}
          title="Check"
          size={3.8}
          className="absolute top-1 fill-current text-green-500"
        />
      )}
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
          iconBackgroundColor={game.colorTheme.gameIcons}
        />
      ))}
    </div>
  );
};

export default GameCharacters;
