// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  // You can adjust this later when you have a real backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
