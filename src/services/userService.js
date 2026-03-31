import api from './api';

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  getWishlist: async () => {
    try {
      const response = await api.get('/users/wishlist');
      return response.data;
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