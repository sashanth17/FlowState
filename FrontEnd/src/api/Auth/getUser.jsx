import api from "../axios";

export const getUser = async () => {
  const response = await api.get("user/getUser");
  return response.data;
};
