import api from "./axios";

// Post a new blog
export async function PostBlog(formData) {
  try {
    // Uses the relative path; the api instance handles the baseURL
    const response = await api.post("/Blogs/Create/", formData);
    return response.data;
  } catch (err) {
    console.error("Post failed", err.response?.data || err.message);
    throw err;
  }
}

// Update an existing blog
export async function UpdatBlog(id, formData) {
  try {
    // Hits the BlogDetailView endpoint
    const response = await api.patch(`/Blogs/${id}`, formData);
    return response.data;
  } catch (err) {
    console.error("Update failed", err.response?.data || err.message);
    throw err;
  }
}

export async function deleteBlogAPI(id) {
  try {
    const response = await api.delete(`/Blogs/${id}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Update failed", err.response?.data || err.message);
    throw err;
  }
}
