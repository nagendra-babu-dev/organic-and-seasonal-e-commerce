import api from './api';

export const dashboardService = {
  getFarmerStats: async () => {
    try {
      const response = await api.get('/dashboard/farmer/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch farmer stats' };
    }
  },

  getCustomerStats: async () => {
    try {
      const response = await api.get('/dashboard/customer/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch customer stats' };
    }
  }
};
