import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, adminLogout, adminGetMe } from '../services/api';
import { AdminUser } from '../types';

interface AuthContextType {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('hendrix_admin_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initAuth() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await adminGetMe();
        if (res.success && res.admin) {
          setAdmin(res.admin as AdminUser);
        } else {
          // Token expired or invalid
          localStorage.removeItem('hendrix_admin_token');
          setToken(null);
          setAdmin(null);
        }
      } catch {
        localStorage.removeItem('hendrix_admin_token');
        setToken(null);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, [token]);

  const login = async (usernameOrEmail: string, password: string) => {
    const res = await adminLogin({ usernameOrEmail, password });
    if (res.success && res.token) {
      localStorage.setItem('hendrix_admin_token', res.token);
      setToken(res.token);
      setAdmin(res.admin as AdminUser);
    }
  };

  const logout = async () => {
    try {
      await adminLogout();
    } catch {
      // Ignore network errors during logout
    } finally {
      localStorage.removeItem('hendrix_admin_token');
      setToken(null);
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
