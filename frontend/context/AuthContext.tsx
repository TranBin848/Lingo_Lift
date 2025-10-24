import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "../types";
import { STORAGE_KEYS } from "../constants";
import * as authApi from "../api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authApi.register({ name, email, password });
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    authApi.logout().catch(() => {
      // Ignore logout errors
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
