import api from './api';
import { toAssetUrl } from '../utils/apiAdapters';

const normalizeOrder = (order) => {
  if (!order) {
    return null;
  }

  return {
    ...order,
    items: (order.items || []).map((item) => ({
      ...item,
      image: toAssetUrl(item.image)
    }))
  };
};

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create order' };
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return (response.data || []).map(normalizeOrder);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch orders' };
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return normalizeOrder(response.data);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch order' };
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel order' };
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update order status' };
    }
  }
};
