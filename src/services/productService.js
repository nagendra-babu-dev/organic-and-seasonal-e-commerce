import api from './api';
import { normalizeProduct } from '../utils/apiAdapters';

const isFormDataPayload = (value) => typeof FormData !== 'undefined' && value instanceof FormData;

export const productService = {
  getProducts: async (filters = {}) => {
    try {
      const response = await api.get('/products', { params: filters });
      return {
        ...response.data,
        products: (response.data.products || []).map(normalizeProduct)
      };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return normalizeProduct(response.data);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product' };
    }
  },

  getFeaturedProducts: async () => {
    try {
      const response = await api.get('/products/featured');
      return response.data.map(normalizeProduct);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch featured products' };
    }
  },

  getMyProducts: async () => {
    try {
      const response = await api.get('/products/mine');
      return response.data.map(normalizeProduct);
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch your products' };
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData, isFormDataPayload(productData)
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : undefined);
      return {
        ...response.data,
        product: normalizeProduct(response.data.product)
      };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create product' };
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await api.put(`/products/${productId}`, productData, isFormDataPayload(productData)
        ? { headers: { 'Content-Type': 'multipart/form-data' } }
        : undefined);
      return {
        ...response.data,
        product: normalizeProduct(response.data.product)
      };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update product' };
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete product' };
    }
  },

  addReview: async (productId, reviewData) => {
    try {
      const response = await api.post(`/products/${productId}/review`, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit review' };
    }
  }
};
