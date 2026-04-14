import api from './api';
import { normalizeProduct, normalizeUser } from '../utils/apiAdapters';

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return normalizeUser(response.data);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return {
        ...response.data,
        user: normalizeUser(response.data.user)
      };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },

  getWishlist: async () => {
    try {
      const response = await api.get('/users/wishlist');
      return response.data.map(normalizeProduct);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch wishlist' };
    }
  },

  addToWishlist: async (productId) => {
    try {
      const response = await api.post('/users/wishlist', { productId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add to wishlist' };
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      const response = await api.delete(`/users/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove from wishlist' };
    }
  }
};
