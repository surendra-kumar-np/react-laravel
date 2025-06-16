import api from './axios';


export const getCsrfCookie = () => {
  return api.get('/sanctum/csrf-cookie');
};

export const register = async (data) => {
  await getCsrfCookie();
  return api.post('/api/register', data);
};

export const login = async (data) => {
  await getCsrfCookie();
  return api.post('/api/login', data);
};

export const logout = async () => {
  await getCsrfCookie();
  return api.post('/api/logout');
};

export const getUser = () => {
  return api.get('/api/user');
};

export const userList = () => {
  return api.get('/api/user-list');
};

export const updateProfile = async (data) => {
  await getCsrfCookie();
  return api.put('/api/update-profile', data);
};

export const changePassword = async (data) => {
  await getCsrfCookie();
  return api.put('/api/change-password', data);
};
// export const forgotPassword = async (data) => {
//   await getCsrfCookie();
//   return api.post('/api/forgot-password', data);
// };

