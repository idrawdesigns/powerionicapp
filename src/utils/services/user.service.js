import axios from "axios";

const API_URL = "https://reqres.in/api/users";

const getAllusers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}`, newUser);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
const update = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export default {
  getAllusers,
  getUser,
  update,
  createUser,
};
