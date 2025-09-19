import { createContext, use, useEffect, useState } from "react";

import type { IAuthContextType } from "@interface/auth";
import type { ReactNode } from "react";

import { StorageManager } from "./use-storage";

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setStorage, getStorage, removeStorage } = StorageManager();

  useEffect(() => {
    const storedAuth = getStorage<boolean>("cookie", "isAuthorized", false);
    if (storedAuth === true) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token?: string) => {
    setIsAuthenticated(true);
    setStorage("cookie", "isAuthorized", true);
    if (token) {
      setStorage("cookie", "access_token", token, { secure: true, sameSite: "Strict" });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeStorage("cookie", "isAuthorized");
    removeStorage("cookie", "access_token");
  };

  return <AuthContext value={{ isAuthenticated, login, logout }}>{children}</AuthContext>;
}

export function useAuth() {
  const ctx = use(AuthContext);
  if (!ctx)
    throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
