import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

// The magnifying glass effect is inspired by the following article: https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7
const AimCursor = ({ gameCanvasElement, imageUrl, aimCordinates }) => {
  const zoomLevel = 1.5;
  const magnifierWidth = 60;
  const magnifierHeight = 60;
  const imgWidth = gameCanvasElement.offsetWidth;
  const imgHeight = gameCanvasElement.offsetHeight;

  return (
    <button
      className="hidden absolute shadow-xl border-2 border-lightgray border-dashed rounded-full opacity-70 z-10 cursor-none sm:flex justify-center items-center"
      style={{
        width: `${magnifierWidth}px`,
        height: `${magnifierHeight}px`,
        top: `${aimCordinates.y - magnifierWidth / 2}px`,
        left: `${aimCordinates.x - magnifierHeight / 2}px`,
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: `${
          -aimCordinates.x * zoomLevel + magnifierWidth / 2
        }px`,
        backgroundPositionY: `${
          -aimCordinates.y * zoomLevel + magnifierHeight / 2
        }px`,
        zIndex: "1000",
        pointerEvents: "none",
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
