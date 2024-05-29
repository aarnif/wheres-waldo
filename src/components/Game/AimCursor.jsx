import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const AimCursor = ({ aimCordinates }) => {
  return (
    <button
      className="absolute w-[50px] h-[50px] bg-white bg-opacity-50 shadow-xl border-2 border-lightgray border-dashed rounded-full opacity-70 z-10 cursor-none flex justify-center items-center"
      style={{
        top: `${aimCordinates.y - 25}px`,
        left: `${aimCordinates.x - 25}px`,
        zIndex: "1",
      }}
    >
      <FontAwesomeIcon
        icon={faCircle}
        style={{
          color: "#ff0000",
        }}
        size="2xs"
      />
    </button>
  );
};

export default AimCursor;
