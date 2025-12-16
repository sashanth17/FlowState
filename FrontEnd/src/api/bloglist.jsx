import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchBlogs() {
  try {
    const response = await axios.get(`${BASE_URL}/Blogs`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
