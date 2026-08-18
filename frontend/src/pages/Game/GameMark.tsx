const GameMark = ({
  coordinates,
}: {
  coordinates: { x: number; y: number };
}) => (
  <div
    data-testid="game-mark"
    className="bg-opacity-70 absolute z-10 flex h-10 w-10 cursor-none items-center justify-center rounded-full border-2 border-dashed border-black bg-white/70 shadow-xl sm:h-12 sm:w-12"
    style={{
      top: `${coordinates.y * 100}%`,
      left: `${coordinates.x * 100}%`,
      transform: "translate(-50%, -50%)",
    }}
  >
    <div className="absolute h-2 w-2 rounded-full bg-green-600"></div>
  </div>
);

export default GameMark;
