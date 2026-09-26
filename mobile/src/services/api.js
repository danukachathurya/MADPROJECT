import axios from 'axios';

// This computer's current Wi-Fi LAN address. Reserve it in your router for a permanent address.
export const API_URL = 'https://madproject-gsst.vercel.app/';

const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' }, timeout: 15000 });

export function setAuthToken(token) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(error.response?.data?.message || 'Unable to reach the server. Please try again.'))
);

export default api;
