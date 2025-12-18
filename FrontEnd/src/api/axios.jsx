import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // already contains /api/v1
  withCredentials: true, // 🔐 send & receive cookies
});

export default api;
