const GameMessageDisplay = ({ gameMessage }) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <h1 className="text-slate-800 font-bold text-4xl">
        {gameMessage.toUpperCase()}
      </h1>
    </div>
  );
};

export default GameMessageDisplay;
