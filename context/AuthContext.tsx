"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  type: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Simulación de autenticación
    if (email === "admin@example.com" && password === "admin123") {
      setUser({ id: "1", email, type: "admin" });
    } else if (email === "user@example.com" && password === "user123") {
      setUser({ id: "2", email, type: "user" });
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);