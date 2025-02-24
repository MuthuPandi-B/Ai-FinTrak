import axios from "axios";

const API= axios.create({
  baseURL: "http://localhost:5000/api", // Adjust to your backend's base URL
  baseURL: "https://ai-fintrak.onrender.com/api", // Adjust to your backend's base URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
