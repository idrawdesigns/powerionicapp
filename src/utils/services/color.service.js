import axios from "axios";

const API_URL = "https://reqres.in/api/unknown";

const getAllColors = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/${page}`);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

const getColor = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  getAllColors,
  getColor,
};
