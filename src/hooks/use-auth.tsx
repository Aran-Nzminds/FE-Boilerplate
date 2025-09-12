import { createContext, useContext, useEffect, useState } from 'react';

import type { ReactNode } from 'react';
import { IAuthContextType } from '@interface/auth';
import { useStorage } from './use-storage';

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setStorage, getStorage, removeStorage } = useStorage();

  useEffect(() => {
    const storedAuth = getStorage<boolean>('cookie', 'isAuthorized', false);
    if (storedAuth === true) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token?: string) => {
    setIsAuthenticated(true);
    setStorage('cookie', 'isAuthorized', true);
    if (token) {
      setStorage('cookie', 'access_token', token, { secure: true, sameSite: 'Strict' });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeStorage('cookie', 'isAuthorized');
    removeStorage('cookie', 'access_token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
