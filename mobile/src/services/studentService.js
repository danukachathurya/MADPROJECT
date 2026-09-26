import api from './api';

export const studentService = {
  create: (payload) => api.post('/students', payload).then((response) => response.data),
  mine: () => api.get('/students/me').then((response) => response.data),
  update: (id, payload) => api.put(`/students/${id}`, payload).then((response) => response.data),
  remove: (id) => api.delete(`/students/${id}`).then((response) => response.data)
};

