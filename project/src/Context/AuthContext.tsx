import React, { createContext, useContext, useState, ReactNode } from "react";

// Updated User Type
type User = {
  name: string;
  building: string;
  apartment: string;
  role: 'admin' | 'resident'; // <--- New Field
};

type AuthContextType = {
  user: User | null;
  login: (name: string, building: string, apartment: string, role: 'admin' | 'resident') => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, building: string, apartment: string, role: 'admin' | 'resident') => {
    setUser({ name, building, apartment, role });
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};