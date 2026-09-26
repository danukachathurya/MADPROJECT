import axios from 'axios';

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL || 'https://madproject-gsst.vercel.app/api';
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, '');

// Accept either the API root or the deployment root in local/Vercel configuration.
export const API_URL = normalizedApiUrl.endsWith('/api')
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

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
