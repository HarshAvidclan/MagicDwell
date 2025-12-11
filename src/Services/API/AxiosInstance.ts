import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { GlobalHeaders } from './GlobalHeaders';
import { AuthService } from './AuthService';

const axiosInstance: AxiosInstance = axios.create({
  headers: GlobalHeaders,
  // timeout: 30000, // 30 seconds timeout
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AuthService.getToken();

    config.headers = {
      ...GlobalHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...config.headers,
    } as any;

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;