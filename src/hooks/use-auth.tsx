// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = Cookies.get('isAuthorized');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token?: string) => {
    setIsAuthenticated(true);
    Cookies.set('isAuthorized', 'true', { expires: 1 });
    if (token) {
      Cookies.set('access_token', token, { secure: true, sameSite: 'Strict' });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('isAuthorized');
    Cookies.remove('access_token');
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
