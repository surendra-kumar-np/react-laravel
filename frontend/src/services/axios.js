import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // VERY IMPORTANT
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  return config;
});

// New helper to ensure CSRF cookie is loaded
export async function getCsrfCookie() {
  await api.get('/sanctum/csrf-cookie');
}

export default api;
