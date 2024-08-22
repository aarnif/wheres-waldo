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

const hexToRgba = (hex, alpha = 1) => {
  hex = hex.replace(/^#/, "");

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default { formatTime, hexToRgba };
