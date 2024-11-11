import baseUrl from "../../baseUrl";

import axios from "axios";

const getAllGames = async () => {
  const response = await axios.get(`${baseUrl}/games`);
  return response.data;
};

const addScoreToGame = async (gameId, user, time) => {
  const response = await axios.post(`${baseUrl}/games/${gameId}`, {
    username: user.username,
    time,
  });
  return response.data;
};

export default { getAllGames, addScoreToGame };
