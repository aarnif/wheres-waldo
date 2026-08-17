import { MdCheck } from "react-icons/md";
import { motion } from "motion/react";
import { BASE_URL } from "../../../config";
import type { FoundCharacter } from "../../types";

const GameFooter = ({
  foundCharacters,
}: {
  foundCharacters: FoundCharacter[];
}) => (
  <motion.footer
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="fixed bottom-0 z-100 flex w-full items-center justify-center"
  >
    <div className="flex gap-8 rounded-t-lg bg-white/20 px-4 py-2 backdrop-blur-xs">
      {foundCharacters.map((character) => {
        const {
          character: { name, displayName, image },
          found,
        } = character;

        return (
          <div key={name} className="flex flex-col items-center gap-0">
            <div className="relative flex items-center justify-center">
              <img
                className="h-12 w-12 rounded-lg object-cover"
                src={`${BASE_URL}/images/characters/${image}`}
                alt={name}
              />
              {found && (
                <div className="absolute inset-0 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-700/50">
                  <MdCheck className="h-12 w-12 fill-current text-green-400" />
                </div>
              )}
            </div>
            <span
              className={`${
                found ? "text-slate-600" : "text-slate-950"
              } text-center text-xs font-bold`}
            >
              {displayName}
            </span>
          </div>
        );
      })}
    </div>
  </motion.footer>
);

export default GameFooter;
