import type { AxiosRequestConfig } from 'axios';
import { handleApiResponse, handleFullApiResponse } from './ResponseHandler';
import axiosInstance from './AxiosInstance';
import { APIBaseResponse } from './Result/Common';

export const API = {
  GET: <T>(url: string, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.get<APIBaseResponse<T>>(url, config)),

  POST: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.post<APIBaseResponse<T>>(url, data, config), data),

  POST_FULL: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleFullApiResponse<T>(axiosInstance.post<APIBaseResponse<T>>(url, data, config), data),

  PUT: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.put<APIBaseResponse<T>>(url, data, config), data),

  PATCH: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.patch<APIBaseResponse<T>>(url, data, config), data),

  DELETE: <T>(url: string, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(axiosInstance.delete<APIBaseResponse<T>>(url, config)),

  UPLOAD: <T>(url: string, data: FormData, config?: AxiosRequestConfig) =>
    handleApiResponse<T>(
      axiosInstance.post<APIBaseResponse<T>>(url, data, {
        ...config,
        headers: {
          ...config?.headers,
          'Content-Type': 'multipart/form-data',
        },
      }),
      data
    ),
};