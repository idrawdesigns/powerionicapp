import axios from "axios";

const API_URL = "https://reqres.in/api";

const register = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}/register`, newUser);

    return response;
  } catch (error) {
    return error.response.data;
  }
};

const login = async (userDetails) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userDetails);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};
