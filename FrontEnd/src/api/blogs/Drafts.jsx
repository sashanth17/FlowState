import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export default async function () {
  try {
    const response = await axios.get(`${BASE_URL}/Blogs/Drafts/`, {
      withCredentials: true,
    });
    console.table(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
}
