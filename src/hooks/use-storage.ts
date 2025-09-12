import { useCallback } from 'react';
import Cookies from 'js-cookie';

import { IUseStorageOptions, StorageType } from '@interface/common';

type CookieOptions = Parameters<typeof Cookies.set>[2];

export function useStorage(options: IUseStorageOptions = {}) {
  const { expires = 7 } = options; // default 7-day cookie expiry

  const storageHandlers = {
    local: {
      get: (key: string) => localStorage.getItem(key),
      set: (key: string, value: string) => localStorage.setItem(key, value),
      remove: (key: string) => localStorage.removeItem(key),
      clear: () => localStorage.clear(),
    },
    session: {
      get: (key: string) => sessionStorage.getItem(key),
      set: (key: string, value: string) => sessionStorage.setItem(key, value),
      remove: (key: string) => sessionStorage.removeItem(key),
      clear: () => sessionStorage.clear(),
    },
    cookie: {
      get: (key: string) => Cookies.get(key),
      set: (key: string, value: string, cookieOptions?: CookieOptions) =>
        Cookies.set(key, value, { expires, ...cookieOptions }),
      remove: (key: string, cookieOptions?: CookieOptions) =>
        Cookies.remove(key, cookieOptions as any),
      clear: () => {
        Object.keys(Cookies.get()).forEach(cookieKey => Cookies.remove(cookieKey));
      },
    },
  } as const;

  /** Set a value in storage */
  const setStorage = useCallback(
    <T>(type: StorageType, key: string, value: T, cookieOptions?: CookieOptions) => {
      try {
        const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);

        if (type === 'cookie') {
          storageHandlers.cookie.set(key, valueToStore, cookieOptions);
        } else {
          storageHandlers[type].set(key, valueToStore);
        }
      } catch (error) {
        console.warn(`Error setting ${type} storage key "${key}":`, error);
      }
    },
    [expires],
  );

  /** Get a value from storage */
  const getStorage = useCallback(
    <T>(type: StorageType, key: string, defaultValue?: T): T | undefined => {
      try {
        const item = storageHandlers[type].get(key);
        if (item === undefined || item === null) return defaultValue;

        // Attempt to parse JSON, fallback to string
        try {
          return JSON.parse(item) as T;
        } catch {
          return item as unknown as T;
        }
      } catch (error) {
        console.warn(`Error reading ${type} storage key "${key}":`, error);
        return defaultValue;
      }
    },
    [],
  );

  /** Remove a value from storage */
  const removeStorage = useCallback(
    (type: StorageType, key: string, cookieOptions?: CookieOptions) => {
      try {
        if (type === 'cookie') {
          storageHandlers.cookie.remove(key, cookieOptions);
        } else {
          storageHandlers[type].remove(key);
        }
      } catch (error) {
        console.warn(`Error removing ${type} storage key "${key}":`, error);
      }
    },
    [],
  );

  /** Clear all keys or a specific storage type */
  const clearAll = useCallback((type?: StorageType) => {
    try {
      if (type) {
        storageHandlers[type].clear();
      } else {
        Object.keys(storageHandlers).forEach(t => storageHandlers[t as StorageType].clear());
      }
    } catch (error) {
      console.warn('Error clearing storage:', error);
    }
  }, []);

  return { setStorage, getStorage, removeStorage, clearAll };
}
