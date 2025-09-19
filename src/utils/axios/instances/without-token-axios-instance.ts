import axios from "axios";

import { handleApiError } from "../error-handler";

export function createAxiosWithoutToken(baseURL: string) {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.response.use(
    response => response,
    (error) => {
      handleApiError(error);
      return Promise.reject(error);
    },
  );

  return instance;
}
