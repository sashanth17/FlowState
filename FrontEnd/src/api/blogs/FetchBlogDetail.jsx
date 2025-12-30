import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchBlogDetail(id) {
  try {
    const response = await axios.get(`${BASE_URL}/Blogs/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
