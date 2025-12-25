import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // already contains /api/v1
  withCredentials: true, // send cookies (access + refresh as HttpOnly cookie)
});

// =====================
// 🔄 Auto Refresh Logic
// =====================

// prevents infinite retry loops
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });

  failedQueue = [];
};

// =====================
// 🛠 Response Interceptor
// =====================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;

    // Only refresh ONCE
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (isRefreshing) {
        // queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalReq))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        console.log("🔁 Access expired → refreshing token...");

        // request new access token
        await api.post("user/refreshtoken");

        processQueue(null);
        return api(originalReq); // retry original request
      } catch (err) {
        processQueue(err, null);

        // 👇 Optional: automatic logout if refresh also fails
        // window.location.href = "/login";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
