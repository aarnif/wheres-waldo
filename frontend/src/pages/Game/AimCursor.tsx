import { BASE_URL } from "../../../config";

// The magnifying glass effect is inspired by the following article: https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7
const AimCursor = ({
  gameCanvasElement,
  image,
  aimCoordinates,
}: {
  gameCanvasElement: HTMLElement | null;
  image: string;
  aimCoordinates: { x: number; y: number };
}) => {
  const zoomLevel = 1.5;
  const magnifierWidth = 60;
  const magnifierHeight = 60;
  const imgWidth = gameCanvasElement?.offsetWidth ?? 0;
  const imgHeight = gameCanvasElement?.offsetHeight ?? 0;

  return (
    <div
      className="pointer-events-none absolute hidden items-center justify-center rounded-full border-2 border-dashed border-slate-950 shadow-xl sm:flex"
      style={{
        width: `${magnifierWidth}px`,
        height: `${magnifierHeight}px`,
        top: `${aimCoordinates.y - magnifierWidth / 2}px`,
        left: `${aimCoordinates.x - magnifierHeight / 2}px`,
        backgroundImage: `url(${BASE_URL}/images/games/${image})`,
        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: `${
          -aimCoordinates.x * zoomLevel + magnifierWidth / 2
        }px`,
        backgroundPositionY: `${
          -aimCoordinates.y * zoomLevel + magnifierHeight / 2
        }px`,
      }}
    >
      <div className="absolute h-2 w-2 rounded-full bg-red-600"></div>
    </div>
  );
};

export default AimCursor;
