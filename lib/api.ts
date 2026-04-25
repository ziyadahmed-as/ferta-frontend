import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // If data is FormData (file upload), delete the default application/json header
  // so the browser can automatically set multipart/form-data with the correct boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optionally redirect to login or refresh token
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
