const pad = (num, size) => {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
};

const formatTime = (time) => {
  let minutes = Math.floor(time / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let deciseconds = Math.floor((time % 100) / 10);
  let centiseconds = time % 10;
  return minutes + ":" + pad(seconds, 2) + ":" + deciseconds + centiseconds;
};

export const getHighestUnlockedLevel = (user, games) => {
  if (!user.playedGames.length) {
    return 1;
  }

  const completedGameIds = user.playedGames.map((pg) => pg.game.id);

  const completedGames = games.filter((game) =>
    completedGameIds.includes(game.id)
  );

  if (!completedGames.length) {
    return 1;
  }

  const highestCompletedLevel = Math.max(
    ...completedGames.map((game) => game.level)
  );
  const nextUnlockedLevel = highestCompletedLevel + 1;

  return nextUnlockedLevel;
};

const isGameUnlocked = (game, user, games) => {
  const highestUnlocked = getHighestUnlockedLevel(user, games);
  return game.level <= highestUnlocked;
};

const hasUserCompletedGame = (game, user) => {
  return user.playedGames?.some((playedGame) => playedGame.game.id === game.id);
};

export default {
  formatTime,
  getHighestUnlockedLevel,
  isGameUnlocked,
  hasUserCompletedGame,
};
