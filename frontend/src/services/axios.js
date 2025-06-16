import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,        // 🔴 MUST be true to send/receive cookies
  headers: {
    Accept: 'application/json', // Laravel expects this
  },
});

// Automatically attach Bearer token (if stored) on every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
