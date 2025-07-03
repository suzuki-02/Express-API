import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL ?? '';

if (!backendURL) {
  console.warn('VITE_BACKEND_URL is not set in the environment variables.');
}

const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
