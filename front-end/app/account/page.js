'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useUser } from '../context/UserContext';
import UserDetailsPopup from '../components/UserDetailsPopup';
import LogoutConfirmationPopup from '../components/LogoutConfirmationPopup';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  FiUser, 
  FiPackage, 
  FiHeart, 
  FiLogOut, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiEdit, 
  FiShoppingBag,
  FiSettings,
  FiCreditCard,
  FiTruck,
  FiStar,
  FiClock,
  FiChevronRight,
  FiUserCheck
} from 'react-icons/fi';
import { HiSparkles, HiStar } from 'react-icons/hi';

export default function AccountPage() {
  const router = useRouter();
  const { userDetails, orderHistory, isLoaded } = useUser();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    phone: 'Not provided',
    address: 'Not provided'
  });

  // Check if user details exist when the component mounts
  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true);
      
      // Wait for context to load
      if (!isLoaded) {
        return;
      }
      
      // Update user state when userDetails changes
      if (userDetails) {
        setUser({
          name: userDetails.name || 'Guest User',
          email: userDetails.email || 'guest@example.com',
          phone: userDetails.phone || 'Not provided',
          address: userDetails.address || 'Not provided'
        });
      }
      setIsLoading(false);
    };

    initializeUser();
  }, [userDetails, isLoaded]);

  // Sample orders to show if no real orders exist
  const sampleOrders = [
    {
      id: 'DEMO-001',
      date: '2024-01-15',
      total: 299.99,
      status: 'Delivered',
      items: [
        { name: 'Premium Almonds', quantity: 2, price: 149.99, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=100&h=100&fit=crop' },
        { name: 'Organic Dates', quantity: 1, price: 149.99, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop' }
      ]
    },
    {
      id: 'DEMO-002', 
      date: '2024-01-10',
      total: 450.75,
      status: 'Processing',
      items: [
        { name: 'Mixed Nuts Gift Box', quantity: 1, price: 450.75, image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop' }
      ]
    }
  ];

  // Use real orders if available, otherwise use sample orders
  const orders = orderHistory.length > 0 ? orderHistory : (userDetails ? [] : sampleOrders);
  const recentOrders = orders.slice(0, 3);

  // Account statistics
  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
    averageOrder: orders.length > 0 ? (orders.reduce((sum, order) => sum + order.total, 0) / orders.length) : 0,
    memberSince: userDetails?.createdAt || '2024'
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userDetails');
    localStorage.removeItem('orderHistory');
    localStorage.removeItem('cartItems');
    
    // Redirect to home page
    router.push('/');
    
    // Reload the page to reset all contexts
    window.location.reload();
  };

  const menuItems = [
    {
      icon: FiPackage,
      title: 'My Orders',
      description: 'Track and manage your orders',
      href: '/account/orders',
      color: 'bg-primary-100 text-primary-600',
      count: stats.totalOrders
    },
    {
      icon: FiHeart,
      title: 'Wishlist',
      description: 'Saved items for later',
      href: '/account/wishlist',
      color: 'bg-red-100 text-red-600',
      count: 0
    },
    {
      icon: FiUser,
      title: 'Profile Settings',
      description: 'Edit personal information',
      href: '/account/profile',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FiCreditCard,
      title: 'Payment Methods',
      description: 'Manage payment options',
      href: '/account/payment',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: FiTruck,
      title: 'Delivery Addresses',
      description: 'Manage shipping addresses',
      href: '/account/addresses',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FiSettings,
      title: 'Account Settings',
      description: 'Privacy and preferences',
      href: '/account/settings',
      color: 'bg-neutral-100 text-neutral-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" text="Loading your account..." />
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
      <Navbar />
      <UserDetailsPopup />
      
      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLogOut className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-display font-bold text-neutral-900 mb-2">
                Confirm Logout
              </h3>
              <p className="text-neutral-600 mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirmation(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="btn-primary bg-red-600 hover:bg-red-700 flex-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-custom py-6">
        {/* Enhanced Profile Header */}
        <div className="card-premium p-6 mb-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-large border-4 border-white flex items-center justify-center">
                    <FiUser className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full border-2 border-white flex items-center justify-center">
                    <FiUserCheck className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-neutral-900 mb-1">
                    {user.name}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <HiSparkles className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-neutral-600">Premium Member</span>
                  </div>
                </div>
              </div>
              <Link
                href="/account/profile"
                className="btn-outline btn-sm interactive"
              >
                <FiEdit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </div>

            {/* User Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                <FiMail className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Email</p>
                  <p className="text-sm font-medium text-neutral-900 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                <FiPhone className="w-5 h-5 text-success-600" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Phone</p>
                  <p className="text-sm font-medium text-neutral-900">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-xl">
                <FiMapPin className="w-5 h-5 text-secondary-600" />
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Location</p>
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.address !== 'Not provided' ? user.address.split(',')[user.address.split(',').length - 2]?.trim() || 'UAE' : 'UAE'}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <FiPackage className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">{stats.totalOrders}</div>
                <div className="text-xs text-neutral-600">Total Orders</div>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <FiShoppingBag className="w-6 h-6 text-success-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">AED {stats.totalSpent.toFixed(0)}</div>
                <div className="text-xs text-neutral-600">Total Spent</div>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <HiStar className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">4.8</div>
                <div className="text-xs text-neutral-600">Avg Rating</div>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-xl">
                <FiClock className="w-6 h-6 text-secondary-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-neutral-900">{stats.memberSince}</div>
                <div className="text-xs text-neutral-600">Member Since</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="card-interactive p-6 hover:shadow-large transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-neutral-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.count !== undefined && (
                    <span className="badge-primary text-xs font-medium">
                      {item.count}
                    </span>
                  )}
                  <FiChevronRight className="w-5 h-5 text-neutral-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Orders Section */}
        {recentOrders.length > 0 && (
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-neutral-900">
                Recent Orders
              </h2>
              <Link
                href="/account/orders"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="border border-neutral-200 rounded-2xl p-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-semibold text-neutral-900">Order #{order.id}</span>
                      <p className="text-sm text-neutral-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-primary-700">AED {order.total.toFixed(2)}</span>
                      <p className={`text-sm font-medium ${
                        order.status === 'Delivered' ? 'text-success-600' :
                        order.status === 'Processing' ? 'text-warning-600' :
                        order.status === 'Shipped' ? 'text-blue-600' : 'text-neutral-600'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-3">
                    <div className="flex items-center space-x-3 mb-3">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                            <FiPackage className="w-4 h-4 text-primary-600" />
                          </div>
                          <span className="text-sm text-neutral-700">{item.name.substring(0, 15)}...</span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <span className="text-sm text-neutral-500">+{order.items.length - 3} more</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <Link
                        href={`/account/orders`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Details
                      </Link>
                      <button className="btn-outline btn-sm text-xs">
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="card p-6">
          <button
            onClick={() => setShowLogoutConfirmation(true)}
            className="w-full flex items-center justify-center space-x-3 p-4 text-red-600 hover:bg-red-50 rounded-2xl transition-colors group"
          >
            <FiLogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
