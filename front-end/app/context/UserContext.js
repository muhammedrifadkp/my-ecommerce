'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  useEffect(() => {
    // Load user details and order history from localStorage on initial load
    const savedDetails = localStorage.getItem('userDetails');
    const savedOrders = localStorage.getItem('orderHistory');

    if (savedDetails) {
      setUserDetails(JSON.parse(savedDetails));
    }

    if (savedOrders) {
      setOrderHistory(JSON.parse(savedOrders));
    }
  }, []);

  // Save user details to localStorage and context
  const saveUserDetails = (details) => {
    localStorage.setItem('userDetails', JSON.stringify(details));
    setUserDetails(details);
    setShowDetailsPopup(false);
  };

  // Add a new order to the order history
  const addOrder = (order) => {
    const newOrderHistory = [order, ...orderHistory];
    localStorage.setItem('orderHistory', JSON.stringify(newOrderHistory));
    setOrderHistory(newOrderHistory);
  };

  // Check if user details exist, if not show popup
  const checkUserDetails = () => {
    if (!userDetails) {
      setShowDetailsPopup(true);
      return false;
    }
    return true;
  };

  return (
    <UserContext.Provider value={{
      userDetails,
      setUserDetails: saveUserDetails,
      showDetailsPopup,
      setShowDetailsPopup,
      checkUserDetails,
      orderHistory,
      addOrder
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
