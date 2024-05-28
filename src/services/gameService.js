import baseUrl from "../../baseUrl";

import axios from "axios";

const getAllGames = async () => {
  const response = await axios.get(`${baseUrl}/games`);
  return response.data;
};

export default { getAllGames };
