import axios from "axios";
import config from "./config.js";

const api = axios.create({
  baseURL: config.backendUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
