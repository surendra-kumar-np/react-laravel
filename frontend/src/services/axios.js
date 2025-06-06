import axios from 'axios';

// Base axios config
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // important for Sanctum cookie auth
  headers: {
    Accept: 'application/json',
  },
});

// Add Authorization header if token exists in localStorage
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Helper to fetch CSRF cookie from Sanctum
export async function getCsrfCookie() {
  await api.get('/sanctum/csrf-cookie');
}

export default api;
