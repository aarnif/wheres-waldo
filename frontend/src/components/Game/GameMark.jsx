import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const GameMark = ({ aimCordinates, isMobile }) => {
  const offset = isMobile ? 18 : 24;

  return (
    <div
      className="absolute w-9 h-9 sm:w-12 sm:h-12 bg-white bg-opacity-70 shadow-xl border-2 border-black border-dashed rounded-full z-10 cursor-none flex justify-center items-center"
      style={{
        top: `${aimCordinates.y - offset}px`,
        left: `${aimCordinates.x - offset}px`,
        zIndex: "1",
      }}
    >
      <FontAwesomeIcon
        icon={faCircle}
        style={{
          color: "#16a34a",
        }}
        size="2xs"
      />
    </div>
  );
};

export default GameMark;
