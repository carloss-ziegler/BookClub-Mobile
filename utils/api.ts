import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.0.18:3001" || "https://book-club-api.onrender.com",
  withCredentials: true,
});
