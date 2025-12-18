import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function PostBlog(form) {
  const formData = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (value !== null) formData.append(key, value);
  });
  try {
    const response = await axios.post(`${BASE_URL}/Blogs/Create/`, formData, {
      withCredentials: true, // Important to receive secure cookie
    });

    return response.data; // Token or success message
  } catch (err) {
    console.error("post failed", err);
    throw err;
  }
}
