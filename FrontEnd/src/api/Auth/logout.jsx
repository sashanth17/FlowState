import api from "../axios";

export const logoutUser = async () => {
  const response = await api.post("user/logout");
  return response.data;
};
