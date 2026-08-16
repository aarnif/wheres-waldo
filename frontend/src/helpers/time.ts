const pad = (num: number, size: number): string => {
  let s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
};

export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const centiseconds = Math.floor((time % 1000) / 10);
  return `${minutes}:${pad(seconds, 2)}.${pad(centiseconds, 2)}`;
};
