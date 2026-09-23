import { motion } from "motion/react";
import { MdCheck } from "react-icons/md";
import { BASE_URL } from "../../../config";
import type { FoundCharacter } from "../../types";

const CharacterMenu = ({
  characters,
  position,
  onSelect,
}: {
  characters: FoundCharacter[];
  position: { x: number; y: number; flipX: boolean; flipY: boolean };
  onSelect: (character: FoundCharacter) => void;
}) => {
  const { x, y, flipX, flipY } = position;
  const offset = { x: flipX ? "-100%" : "0%", y: flipY ? "-100%" : "0%" };

  return (
    <motion.ul
      data-testid="character-menu"
      aria-label="Choose a character"
      initial={{ opacity: 0, scale: 0.95, ...offset }}
      animate={{ opacity: 1, scale: 1, ...offset }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={(event) => event.stopPropagation()}
      className="absolute z-20 flex flex-col gap-1 rounded-lg border border-slate-50/20 bg-white/20 p-2 shadow-lg backdrop-blur-md"
      style={{ top: `${y * 100}%`, left: `${x * 100}%` }}
    >
      {characters.map((gameCharacter) => (
        <li key={gameCharacter.id}>
          <button
            type="button"
            disabled={gameCharacter.found}
            onClick={() => onSelect(gameCharacter)}
            className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-slate-500/50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <div className="relative flex items-center justify-center">
              <img
                className={`h-10 w-10 rounded-lg object-cover ${gameCharacter.found ? "brightness-50" : ""}`}
                src={`${BASE_URL}/images/characters/${gameCharacter.character.image}`}
                alt=""
              />
              {gameCharacter.found && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MdCheck className="h-10 w-10 fill-current text-green-400" />
                </div>
              )}
            </div>
            <span
              className={`grow text-left text-sm font-bold ${gameCharacter.found ? "text-slate-600" : "text-slate-950"}`}
            >
              {gameCharacter.character.displayName}
            </span>
          </button>
        </li>
      ))}
    </motion.ul>
  );
};

export default CharacterMenu;
