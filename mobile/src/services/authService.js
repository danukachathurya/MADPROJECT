import api from './api';

export const authService = {
  register: (payload) => api.post('/auth/register', payload).then((response) => response.data),
  login: (payload) => api.post('/auth/login', payload).then((response) => response.data),
  me: () => api.get('/auth/me').then((response) => response.data)
};

