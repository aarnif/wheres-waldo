const GameOverModal = ({ time, startNewGame, handleChangeGame }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black z-10">
      <div className="overflow-auto w-[600px] h-[350px] p-12 flex flex-col justify-center items-center bg-slate-800 rounded-xl text-slate-100 z-100">
        <h1 className="w-full mb-8 flex-grow text-2xl font-bold text-center">
          Congratulations! You found all the characters!
        </h1>

        <h2 className="w-full mb-8 flex-grow text-xl font-bold text-center">
          Your time was:
        </h2>

        <h1 className="w-full mb-8 flex-grow text-3xl font-bold text-center">
          {time}
        </h1>

        <div className="w-full flex-grow flex justify-center items-center">
          <button
            onClick={startNewGame}
            className="mr-4 w-full flex-grow max-w-[200px] h-[80px] bg-slate-900 rounded-xl text-xl font-bold
          hover:bg-black active:scale-95 transition"
          >
            NEW GAME
          </button>

          <button
            onClick={handleChangeGame}
            className="ml-4 w-full flex-grow max-w-[200px] h-[80px] bg-slate-900 rounded-xl text-xl font-bold
          hover:bg-black active:scale-95 transition"
          >
            CHANGE GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
