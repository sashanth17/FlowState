import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginApi(username, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/test/token`,
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true, // Important to receive secure cookie
      }
    );

    return response.data; // Token or success message
  } catch (err) {
    console.error("Login failed", err);
    throw err;
  }
}
