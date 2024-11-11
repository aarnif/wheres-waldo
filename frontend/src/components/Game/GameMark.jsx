import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const GameMark = ({ aimCordinates }) => {
  return (
    <div
      className="absolute w-[50px] h-[50px] bg-white bg-opacity-70 shadow-xl border-2 border-black border-dashed rounded-full z-10 cursor-none flex justify-center items-center"
      style={{
        top: `${aimCordinates.y - 25}px`,
        left: `${aimCordinates.x - 25}px`,
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
