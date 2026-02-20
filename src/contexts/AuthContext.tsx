import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { mockUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string): boolean => {
    const found = mockUsers.find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // Demo: any email/password works
    const demoUser: User = { id: 'demo', email, role: 'user', isActive: true, createdAt: new Date().toISOString() };
    setUser(demoUser);
    return true;
  };

  const logout = () => setUser(null);

  const register = (email: string, _password: string): boolean => {
    const demoUser: User = { id: 'new-' + Date.now(), email, role: 'user', isActive: true, createdAt: new Date().toISOString() };
    setUser(demoUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
