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

export default { formatTime };
