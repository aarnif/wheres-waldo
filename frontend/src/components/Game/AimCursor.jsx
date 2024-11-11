import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

// The magnifying glass effect is inspired by the following article: https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7
const AimCursor = ({
  gameHeaderElement,
  gameImageElement,
  imageUrl,
  aimCordinates,
}) => {
  const zoomLevel = 1.5;
  const magnifierWidth = 60;
  const magnifierHeight = 60;
  const imgWidth = gameImageElement.offsetWidth;
  const imgHeight = gameImageElement.offsetHeight;

  return (
    <button
      className="absolute shadow-xl border-2 border-lightgray border-dashed rounded-full opacity-70 z-10 cursor-none flex justify-center items-center"
      style={{
        width: `${magnifierWidth}px`,
        height: `${magnifierHeight}px`,
        top: `${aimCordinates.y - magnifierWidth / 2}px`,
        left: `${aimCordinates.x - magnifierHeight / 2}px`,
        backgroundImage: `url('${imageUrl}')`,

        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,

        backgroundPositionX: `${
          -aimCordinates.x * zoomLevel + magnifierWidth / 2
        }px`,
        backgroundPositionY: `${
          (-aimCordinates.y + gameHeaderElement.offsetHeight) * zoomLevel +
          magnifierHeight / 2
        }px`,
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
