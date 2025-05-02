// frontend/utils/auth.js

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  const token = localStorage.getItem('adminToken');
  return !!token;
};

// Get admin info
export const getAdminInfo = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const adminInfo = localStorage.getItem('adminInfo');
  return adminInfo ? JSON.parse(adminInfo) : null;
};

// Logout function
export const logout = () => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminInfo');
  
  // Redirect to login page
  window.location.href = '/admin/login';
};
