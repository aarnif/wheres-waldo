import axios from "axios";
const baseUrl = "http://localhost:5000/api";

const getAllGames = async () => {
  const response = await axios.get(`${baseUrl}/games`);
  return response.data;
};

export default { getAllGames };
