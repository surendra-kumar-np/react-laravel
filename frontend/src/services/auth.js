import api, { getCsrfCookie } from './axios';

// Registration API call
export const register = async (data) => {
  await getCsrfCookie(); // Fetch CSRF cookie first

  const response = await api.post('/api/register', data);

  // If your backend returns token on register, save it:
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }

  return response.data;
};

// Login API call
export const login = async (data) => {
  await getCsrfCookie(); // Fetch CSRF cookie first

  const response = await api.post('/api/login', data);

  // Save token returned by backend
  localStorage.setItem('token', response.data.token);

  return response.data;
};

// Logout API call
export const logout = async () => {
  await api.post('/api/logout');
  localStorage.removeItem('token');
};

// Get authenticated user info
export const getUser = () => api.get('/api/user');

// Get user list (update method/endpoint if required)
export const userList = () => api.get('/api/user-list');

// Example usage - optional
async function fetchUserList() {
  try {
    const response = await userList();
    console.log(response.data);
  } catch (error) {
    console.error('API error:', error.response?.status, error.response?.data);
  }
}

fetchUserList();
