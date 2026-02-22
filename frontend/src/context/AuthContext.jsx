import { createContext, useContext, useMemo, useState } from "react";
import { login, register } from "../api/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("tm_token"));

  const value = useMemo(() => {
    const isAuthenticated = Boolean(token);

    const handleLogin = async (payload) => {
      const result = await login(payload);
      localStorage.setItem("tm_token", result.token);
      setToken(result.token);
      return result;
    };

    const handleRegister = async (payload) => {
      const result = await register(payload);
      localStorage.setItem("tm_token", result.token);
      setToken(result.token);
      return result;
    };

    const logout = () => {
      localStorage.removeItem("tm_token");
      setToken(null);
    };

    return { token, isAuthenticated, login: handleLogin, register: handleRegister, logout };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
