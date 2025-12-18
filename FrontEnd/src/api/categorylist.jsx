import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
export const fetchCategoryies = async () => {
  try {
    const data = axios.get(`${BASE_URL}/Blogs/Category/`);
    return (await data).data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
