import { StorageManager } from "@hooks/use-storage";
import axios from "axios";

import { API_BASE_URLS } from "./api-config";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const { setStorage, getStorage, removeStorage } = StorageManager();

export function getAccessToken(): string | undefined {
  return getStorage("cookie", ACCESS_TOKEN_KEY) || undefined;
}

export function setAccessToken(token: string) {
  setStorage("cookie", ACCESS_TOKEN_KEY, token, { secure: true, sameSite: "strict", path: "/" });
}

export const getRefreshToken = (): string | undefined => getStorage("cookie", REFRESH_TOKEN_KEY);

export function setRefreshToken(token: string) {
  setStorage("cookie", REFRESH_TOKEN_KEY, token, { secure: true, sameSite: "strict", path: "/" });
}

export function clearTokens() {
  removeStorage("cookie", ACCESS_TOKEN_KEY, { path: "/" });
  removeStorage("cookie", REFRESH_TOKEN_KEY, { path: "/" });
}

/**
 * @description Requests a new access token using the refresh token.
 * If successful, updates both tokens in cookies.
 * If it fails, clears all tokens (forces the user to login again).
 */
// ! Need to change the endpoint
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken)
    return null;
  try {
    const response = await axios.post(`${API_BASE_URLS.auth}/auth/refresh`, { refreshToken });
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return response.data.accessToken as string;
  }
  catch (error) {
    clearTokens();
    return (error as undefined) || null;
  }
}
