import baseUrl from "../../baseUrl";

const GameCharacter = ({ gameId, character }) => {
  return (
    <div
      key={character.character.name}
      className="flex flex-col items-center gap-2"
    >
      <div className="p-2 bg-slate-300/50 rounded-lg flex items-center justify-center shadow-lg">
        <img
          className="w-16 h-16 rounded-lg object-cover"
          src={`${baseUrl}/games/${gameId}/characters/${character.id}/image`}
          alt={character.character.name}
        />
      </div>
      <span className="text-slate-50 text-base font-bold text-center">
        {character.character.displayName}
      </span>
    </div>
  );
};

export default GameCharacter;
