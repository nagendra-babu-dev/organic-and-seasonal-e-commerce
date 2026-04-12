import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';
import { cartService } from '../services/cartService';
import { normalizeProduct } from '../utils/apiAdapters';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const updateCartTotals = useCallback((items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartCount(count);
    setCartTotal(total);
  }, []);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(savedCart);
      updateCartTotals(savedCart);
      return;
    }

    const response = await cartService.getCart();
    const items = (response.items || []).map(normalizeProduct);
    setCart(items);
    updateCartTotals(items);
  }, [isAuthenticated, updateCartTotals]);

  useEffect(() => {
    const syncCart = async () => {
      if (!isAuthenticated) {
        await refreshCart();
        return;
      }

      try {
        const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');

        for (const item of guestCart) {
          await cartService.addToCart(item.id, item.quantity);
        }

        if (guestCart.length > 0) {
          localStorage.removeItem('cart');
        }

        await refreshCart();
      } catch (error) {
        console.error('Cart sync error:', error);
        setCart([]);
        updateCartTotals([]);
      }
    };

    syncCart();
  }, [isAuthenticated, refreshCart, updateCartTotals]);

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      await cartService.addToCart(product.id, quantity);
      await refreshCart();
    } else {
      setCart((previousCart) => {
        const existing = previousCart.find((item) => item.id === product.id);
        const nextCart = existing
          ? previousCart.map((item) => (
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ))
          : [...previousCart, { ...product, quantity }];

        localStorage.setItem('cart', JSON.stringify(nextCart));
        updateCartTotals(nextCart);
        return nextCart;
      });
    }

    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = async (productId) => {
    if (isAuthenticated) {
      await cartService.removeFromCart(productId);
      await refreshCart();
    } else {
      setCart((previousCart) => {
        const nextCart = previousCart.filter((item) => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(nextCart));
        updateCartTotals(nextCart);
        return nextCart;
      });
    }

    toast.info('Item removed from cart');
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (isAuthenticated) {
      await cartService.updateQuantity(productId, quantity);
      await refreshCart();
      return;
    }

    setCart((previousCart) => {
      const nextCart = previousCart.map((item) => (
        item.id === productId ? { ...item, quantity } : item
      ));
      localStorage.setItem('cart', JSON.stringify(nextCart));
      updateCartTotals(nextCart);
      return nextCart;
    });
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      await cartService.clearCart();
      await refreshCart();
    } else {
      localStorage.removeItem('cart');
      setCart([]);
      updateCartTotals([]);
    }

    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
