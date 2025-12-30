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

import api from "./axios";
export const CreateCategory = async (form) => {
  try {
    const data = await api.post(`${BASE_URL}/Blogs/Category/`, form);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateCategory = async (form, id) => {
  try {
    const data = await api.patch(`${BASE_URL}/Blogs/Category/${id}`, form);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
