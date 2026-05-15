import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // Only attach token if it exists and is a valid non-empty string
  // Prevents sending "undefined" or "null" strings that cause 401s on public endpoints
  if (token && token !== "undefined" && token !== "null" && token.length > 10) {
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
