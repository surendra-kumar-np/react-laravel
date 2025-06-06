import api from './axios';

// This gets the CSRF cookie from Laravel Sanctum
export const getCsrfToken = () => api.get('/sanctum/csrf-cookie');

// Registration API call
export const register = async (data) => {
  await getCsrfToken();
  return api.post('/api/register', data);
};

// Login API call
export const login = async (data) => {
  await getCsrfToken();
await api.post('/api/login', data);
};

// Logout API call
export const logout = () => api.post('/api/logout');

// Get authenticated user info
export const getUser = () => api.get('/api/user');

// Get user list (assuming GET, change to POST if your backend expects that)
export const userList = () => api.get('/api/user-list');

// Usage example
async function fetchUserList() {
  try {
    // Only call getCsrfToken if you have not logged in yet or session expired
    // await getCsrfToken(); // usually not needed here if already logged in

    const response = await userList();
    console.log(response.data);
  } catch (error) {
    console.error('API error:', error.response?.status, error.response?.data);
  }
}

fetchUserList();
