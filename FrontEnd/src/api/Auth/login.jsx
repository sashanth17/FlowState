import api from "../axios";

export const loginUser = async (username, password) => {
  const response = await api.post("user/login", {
    username,
    password,
  });

  return response.data; // { message: "Login successful" }
};
