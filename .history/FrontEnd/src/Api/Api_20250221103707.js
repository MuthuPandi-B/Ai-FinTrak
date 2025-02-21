import axios from "axios";

const Api= axios.create({
  baseURL: "http://localhost:5000/api", // Adjust to your backend's base URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
