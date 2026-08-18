const GameHeader = ({
  title,
  time,
  handleCancelGame,
}: {
  title: string;
  time: string;
  handleCancelGame: () => void;
}) => (
  <header className="fixed top-0 z-10 flex w-full items-center justify-between gap-4 bg-white/20 px-4 py-2 backdrop-blur-xs">
    <h1 className="font-title text-2xl font-bold text-red-600">{title}</h1>
    <div className="flex items-center gap-4">
      <p
        data-testid="game-time"
        className="rounded-lg p-1 font-mono text-xl font-bold text-slate-950"
      >
        {time}
      </p>
      <button
        onClick={handleCancelGame}
        className="cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-center text-xs font-bold text-white shadow-[3px_3px_0px_0px] shadow-slate-950 transition-all duration-300 hover:bg-red-700 active:translate-x-0.75 active:translate-y-0.75 active:shadow-none"
      >
        Quit
      </button>
    </div>
  </header>
);

export default GameHeader;
