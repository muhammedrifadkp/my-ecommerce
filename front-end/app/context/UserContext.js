'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load user details and order history from localStorage on initial load
    const savedDetails = localStorage.getItem('userDetails');
    const savedOrders = localStorage.getItem('orderHistory');

    if (savedDetails) {
      try {
        const parsedDetails = JSON.parse(savedDetails);
        setUserDetails(parsedDetails);
      } catch (error) {
        console.error('Error parsing user details:', error);
        localStorage.removeItem('userDetails');
      }
    }

    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        setOrderHistory(parsedOrders);
      } catch (error) {
        console.error('Error parsing order history:', error);
        localStorage.removeItem('orderHistory');
      }
    }

    setIsLoaded(true);
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

  // Check if user details exist, only show popup if explicitly requested
  const checkUserDetails = (forceShow = false) => {
    if (!userDetails) {
      if (forceShow) {
        setShowDetailsPopup(true);
      }
      return false;
    }
    return true;
  };

  // Function to explicitly request user details (for checkout, etc.)
  const requestUserDetails = () => {
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
      requestUserDetails,
      orderHistory,
      addOrder,
      isLoaded
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
