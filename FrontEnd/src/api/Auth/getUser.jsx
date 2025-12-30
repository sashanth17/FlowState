import api from "../axios";

export const getUser = async () => {
  try {
    const response = await api.get("user/getUser");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUsersList = async (page = 1) => {
  try {
    const response = await api.get(`user/Users?page=${page}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
