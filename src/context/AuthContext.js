import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { normalizeUser } from '../utils/apiAdapters';

export const AuthContext = createContext();

const persistAuth = (userData, token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
};

const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cart');
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token) {
        setLoading(false);
        return;
      }

      if (userData) {
        try {
          setUser(normalizeUser(JSON.parse(userData)));
          setIsAuthenticated(true);
        } catch (error) {
          clearAuth();
        }
      }

      try {
        const response = await authService.getCurrentUser();
        const normalizedUser = normalizeUser(response.user);
        persistAuth(normalizedUser, token);
        setUser(normalizedUser);
        setIsAuthenticated(true);
      } catch (error) {
        clearAuth();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const login = (userData, token) => {
    const normalizedUser = normalizeUser(userData);
    persistAuth(normalizedUser, token);
    setUser(normalizedUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = (userData, token) => {
    const normalizedUser = normalizeUser(userData);
    persistAuth(normalizedUser, token);
    setUser(normalizedUser);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
