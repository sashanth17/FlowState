import api from "../axios";

export default async function getMyBlogs() {
  try {
    const response = await api.get("/Blogs/MyBlogs/");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
