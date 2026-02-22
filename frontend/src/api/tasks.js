import { apiRequest } from "./client.js";

export const getTasks = ({ page = 0, size = 10, sort = "createdAt,desc" } = {}, token) =>
  apiRequest(`/tasks?page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`, { token });

export const searchTasks = ({ title, page = 0, size = 10 }, token) =>
  apiRequest(`/tasks/search?title=${encodeURIComponent(title)}&page=${page}&size=${size}`, {
    token
  });

export const filterTasks = ({ status, page = 0, size = 10 }, token) =>
  apiRequest(`/tasks/filter?status=${encodeURIComponent(status)}&page=${page}&size=${size}`, {
    token
  });

export const createTask = (payload, token) =>
  apiRequest("/tasks", { method: "POST", body: payload, token });

export const updateTask = (id, payload, token) =>
  apiRequest(`/tasks/${id}`, { method: "PUT", body: payload, token });

export const updateStatus = (id, status, token) =>
  apiRequest(`/tasks/${id}/status`, { method: "PATCH", body: status, token });

export const deleteTask = (id, token) =>
  apiRequest(`/tasks/${id}`, { method: "DELETE", token });
