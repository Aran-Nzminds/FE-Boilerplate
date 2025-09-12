import axios from 'axios';

import { useStorage } from '@hooks/use-storage';
import { API_BASE_URLS } from './api-config';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const { setStorage, getStorage, removeStorage } = useStorage();

export const getAccessToken = (): string | undefined =>
  getStorage('cookie', ACCESS_TOKEN_KEY) || undefined;

export const setAccessToken = (token: string) => {
  setStorage('cookie', ACCESS_TOKEN_KEY, token, { secure: true, sameSite: 'strict', path: '/' });
};

export const getRefreshToken = (): string | undefined => getStorage('cookie', REFRESH_TOKEN_KEY);

export const setRefreshToken = (token: string) => {
  setStorage('cookie', REFRESH_TOKEN_KEY, token, { secure: true, sameSite: 'strict', path: '/' });
};

export const clearTokens = () => {
  removeStorage('cookie', ACCESS_TOKEN_KEY, { path: '/' });
  removeStorage('cookie', REFRESH_TOKEN_KEY, { path: '/' });
};

/**
 * @description Requests a new access token using the refresh token.
 * If successful, updates both tokens in cookies.
 * If it fails, clears all tokens (forces the user to login again).
 */
//! Need to change the endpoint
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    const response = await axios.post(`${API_BASE_URLS.auth}/auth/refresh`, { refreshToken });
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return response.data.accessToken as string;
  } catch (error) {
    clearTokens();
    return null;
  }
};
