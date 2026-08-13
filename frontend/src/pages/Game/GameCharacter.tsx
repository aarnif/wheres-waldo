import { BASE_URL } from "../../../config";
import type { GameCharacter as GameCharacterType } from "../../types";

const GameCharacter = ({ character }: { character: GameCharacterType }) => {
  const { name, displayName, image } = character.character;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center rounded-lg border border-slate-50/20 bg-slate-50/10 p-2 shadow-lg">
        <img
          className="h-12 w-12 rounded-lg object-cover sm:h-16 sm:w-16"
          src={`${BASE_URL}/images/characters/${image}`}
          alt={name}
        />
      </div>
      <span className="text-center text-sm font-bold text-slate-50 sm:text-base">
        {displayName}
      </span>
    </div>
  );
};

export default GameCharacter;
