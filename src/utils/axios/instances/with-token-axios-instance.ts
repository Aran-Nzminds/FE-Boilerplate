import axios from "axios";

import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { handleApiError } from "../error-handler";
import { clearTokens, getAccessToken, refreshAccessToken } from "../token-service";

export function createAxiosWithToken(baseURL: string) {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = getAccessToken();
      if (token) {
        if (typeof (config.headers as any).set === "function") {
          (config.headers as any).set("Authorization", `Bearer ${token}`);
        }
        else {
          (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => Promise.reject(error),
  );

  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();
        if (newToken && originalRequest.headers) {
          if (typeof (originalRequest.headers as any).set === "function") {
            (originalRequest.headers as any).set("Authorization", `Bearer ${newToken}`);
          }
          else {
            (originalRequest.headers as Record<string, string>).Authorization
              = `Bearer ${newToken}`;
          }
          return instance(originalRequest);
        }
        clearTokens();
        window.location.href = "/login";
      }
      handleApiError(error);
      return Promise.reject(error);
    },
  );

  return instance;
}
