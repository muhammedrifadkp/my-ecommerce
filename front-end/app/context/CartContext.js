'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Function to generate a unique client ID
function generateClientId() {
  return 'client_' + Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [clientId, setClientId] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Update cart count whenever cartItems changes
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    // Get or create a unique client ID
    let id = localStorage.getItem('clientId');
    if (!id) {
      id = generateClientId();
      localStorage.setItem('clientId', id);
    }
    setClientId(id);

    // Load cart from localStorage using the client-specific key
    const cartKey = `cart_${id}`;
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const addToCart = (product, quantity, customPrice = null) => {
    // Create a new item with the provided quantity and optional custom price
    const newItem = {
      ...product,
      quantity,
      // If customPrice is provided, use it; otherwise use the original price
      price: customPrice !== null ? customPrice : product.price
    };

    setCartItems(prev => {
      // Check if this product already exists in the cart
      const existing = prev.find(item => item._id === product._id);

      const newCart = existing
        ? prev.map(item =>
            item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                // If customPrice is provided, update the price; otherwise keep the existing price
                price: customPrice !== null ? customPrice : item.price
              }
            : item
          )
        : [...prev, newItem];

      // Use client-specific cart key
      const cartKey = `cart_${clientId}`;
      localStorage.setItem(cartKey, JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item._id !== productId);
      // Use client-specific cart key
      const cartKey = `cart_${clientId}`;
      localStorage.setItem(cartKey, JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems(prev => {
      const newCart = prev.map(item =>
        item._id === productId
          ? { ...item, quantity }
          : item
      );
      // Use client-specific cart key
      const cartKey = `cart_${clientId}`;
      localStorage.setItem(cartKey, JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    // Use client-specific cart key
    const cartKey = `cart_${clientId}`;
    localStorage.removeItem(cartKey);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}