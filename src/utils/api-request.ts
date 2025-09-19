import type { z } from "zod";

import { createAxiosWithToken } from "./axios/instances/with-token-axios-instance";
import { createAxiosWithoutToken } from "./axios/instances/without-token-axios-instance";

const axiosWithToken = createAxiosWithToken(import.meta.env.VITE_API_BASE_URL);
const axiosWithoutToken = createAxiosWithoutToken(import.meta.env.VITE_API_BASE_URL);

interface RequestOptions<T> {
  schema?: z.ZodType<T>;
  token?: boolean;
}

/**
 * @description Generic API request wrapper
 * - Picks the correct axios instance (with/without token)
 * - Optionally validates response with Zod
 */
export async function apiRequest<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
  options: RequestOptions<T> = {},
): Promise<T> {
  const instance = options.token ? axiosWithToken : axiosWithoutToken;

  const response = await instance.request({
    method,
    url,
    data,
  });

  if (options.schema) {
    return options.schema.parse(response.data);
  }

  return response.data as T;
}
