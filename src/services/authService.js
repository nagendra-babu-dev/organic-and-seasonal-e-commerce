import api from './api';
import { normalizeUser } from '../utils/apiAdapters';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return {
        ...response.data,
        user: normalizeUser(response.data.user)
      };
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', {
        ...userData,
        user_type: userData.user_type || userData.userType
      });
      return {
        ...response.data,
        user: normalizeUser(response.data.user)
      };
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return {
        ...response.data,
        user: normalizeUser(response.data.user)
      };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user' };
    }
  }
};
