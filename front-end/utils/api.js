// frontend/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://al-mashhour-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      return Promise.reject({
        message: error.response.data?.error || 'An error occurred',
        status: error.response.status,
      });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ message: 'Network error - please check your connection' });
    }
    // Something happened in setting up the request
    return Promise.reject({ message: error.message });
  }
);

export const apiClient = {
  // Product endpoints
  getAllProducts: async () => {
    try {
      return await api.get('/api/products');
    } catch (error) {
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      return await api.get(`/api/products/${category}`);
    } catch (error) {
      throw error;
    }
  },

  searchProducts: async (query) => {
    try {
      if (!query || query.trim().length < 2) {
        throw new Error('Search query must be at least 2 characters long');
      }
      return await api.get(`/api/products?search=${encodeURIComponent(query.trim())}`);
    } catch (error) {
      throw error;
    }
  },

  // Cart endpoints
  addToCart: async (productId, quantity) => {
    try {
      return await api.post('/api/cart', { productId, quantity });
    } catch (error) {
      throw error;
    }
  },

  getCart: async () => {
    try {
      return await api.get('/api/cart');
    } catch (error) {
      throw error;
    }
  },

  // Checkout endpoint (if implemented in backend)
  checkout: async (orderData) => {
    try {
      return await api.post('/api/checkout', orderData);
    } catch (error) {
      throw error;
    }
  }
};

// Alternative version using fetch
/*
export const fetchClient = {
  getProductsByCategory: async (category) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${category}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  addToCart: async (productId, quantity) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    });
    if (!res.ok) throw new Error('Failed to add to cart');
    return res.json();
  }
};
*/