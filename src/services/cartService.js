import api from './api';

export const cartService = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cart' };
    }
  },

  addToCart: async (productId, quantity) => {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add to cart' };
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const response = await api.put('/cart/update', { productId, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update cart' };
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove from cart' };
    }
  },

  clearCart: async () => {
    try {
      const response = await api.delete('/cart/clear');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to clear cart' };
    }
  }
};