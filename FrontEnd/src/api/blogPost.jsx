import axios from "axios";
import api from "./axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export async function PostBlog(form) {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (value !== null) formData.append(key, value);
  });
  try {
    const response = await api.post(`${BASE_URL}/Blogs/Create/`, formData);

    return response.data; // Token or success message
  } catch (err) {
    console.error("post failed", err);
    throw err;
  }
}
