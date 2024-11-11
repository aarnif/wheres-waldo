import baseUrl from "../../baseUrl";

import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const logIn = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const createUser = async (newUser) => {
  const response = await axios.post(`${baseUrl}/users`, newUser);
  return response.data;
};

export default { setToken, logIn, createUser };
