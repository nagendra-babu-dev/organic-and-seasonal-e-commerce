import React, { createContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(initialProducts);
      const uniqueCategories = [...new Set(initialProducts.map(p => p.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    }, 500);
  }, []);

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  const getProductsBySeason = (season) => {
    return products.filter(p => p.season === season);
  };

  const searchProducts = (query) => {
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      categories,
      getProductById,
      getProductsByCategory,
      getProductsBySeason,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};