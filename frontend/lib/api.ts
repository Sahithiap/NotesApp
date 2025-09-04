// 📂 frontend/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // from .env.local
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token automatically if it exists in localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

/**
 * Auth APIs
 */
export const registerUser = (data: { name: string; email: string; password: string }) =>
  api.post("/auth/register", data);

export const loginUser = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

/**
 * Notes APIs
 */
export const getNotes = () => api.get("/notes");
export const createNote = (data: { title: string; content: string }) => api.post("/notes", data);
export const updateNote = (id: string, data: { title?: string; content?: string }) =>
  api.put(`/notes/${id}`, data);
export const deleteNote = (id: string) => api.delete(`/notes/${id}`);
