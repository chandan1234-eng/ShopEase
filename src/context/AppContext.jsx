import { createContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Create the context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  // Global state
  const [cart, setCart] = useLocalStorage('shopease-cart', []);
  const [user, setUser] = useLocalStorage('shopease-user', null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast helper
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // Cart operations
  const addToCart = useCallback(
    (product) => {
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.id === product.id);
        if (existing) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prevCart, { ...product, qty: 1 }];
      });
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    (id) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    },
    [setCart]
  );

  const updateQty = useCallback(
    (id, qty) => {
      if (qty <= 0) {
        removeFromCart(id);
        return;
      }
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === id ? { ...item, qty } : item))
      );
    },
    [setCart, removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  // Provide context value
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    user,
    setUser,
    showSignIn,
    setShowSignIn,
    addToast,
    toasts,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export default AppContext;