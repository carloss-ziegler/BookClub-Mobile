import axios from "axios";

export const api = axios.create({
  baseURL:
    "http://192.168.0.15:3001" || "https://bookclub-api-ctcw.onrender.com",
  withCredentials: true,
});
