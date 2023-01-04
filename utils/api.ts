import axios from "axios";

export const api = axios.create({
  baseURL: "book-club-api.vercel.app",
  withCredentials: true,
});
