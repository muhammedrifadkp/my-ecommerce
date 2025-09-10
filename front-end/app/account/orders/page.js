'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { useUser } from '../../context/UserContext';
import UserDetailsPopup from '../../components/UserDetailsPopup';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FiArrowLeft, FiPackage, FiTruck, FiCheck, FiClock, FiShoppingBag } from 'react-icons/fi';

export default function OrdersPage() {
  const { orderHistory, isLoaded } = useUser();
  const [displayOrders, setDisplayOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, delivered, processing, shipped

  // Get status icon and color based on status
  const getStatusInfo = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return { icon: FiCheck, color: 'text-success-600', bgColor: 'bg-success-100' };
      case 'shipped':
      case 'in transit':
        return { icon: FiTruck, color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'processing':
        return { icon: FiClock, color: 'text-warning-600', bgColor: 'bg-warning-100' };
      default:
        return { icon: FiPackage, color: 'text-neutral-600', bgColor: 'bg-neutral-100' };
    }
  };

  // Process orders to add status icons and colors
  useEffect(() => {
    const initializeOrders = async () => {
      setIsLoading(true);
      
      // Wait for context to load
      if (!isLoaded) {
        return;
      }

      // Process real orders if available
      if (orderHistory && orderHistory.length > 0) {
        const processedOrders = orderHistory.map(order => {
          const { icon, color, bgColor } = getStatusInfo(order.status);
          return {
            ...order,
            statusIcon: icon,
            statusColor: color,
            statusBgColor: bgColor
          };
        });
        setDisplayOrders(processedOrders);
      } else {
        // Sample orders for demonstration
        setDisplayOrders([
          {
            id: 'DEMO-001',
            date: '2024-01-15',
            total: 299.99,
            status: 'Delivered',
            statusIcon: FiCheck,
            statusColor: 'text-success-600',
            statusBgColor: 'bg-success-100',
            items: [
              {
                name: 'Premium Almonds',
                quantity: 2,
                price: 149.99,
                image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=100&h=100&fit=crop'
              },
              {
                name: 'Organic Dates',
                quantity: 1,
                price: 149.99,
                image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop'
              }
            ]
          },
          {
            id: 'DEMO-002',
            date: '2024-01-10', 
            total: 450.75,
            status: 'Processing',
            statusIcon: FiClock,
            statusColor: 'text-warning-600',
            statusBgColor: 'bg-warning-100',
            items: [
              {
                name: 'Mixed Nuts Gift Box',
                quantity: 1,
                price: 450.75,
                image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=100&h=100&fit=crop'
              }
            ]
          },
          {
            id: 'DEMO-003',
            date: '2024-01-05',
            total: 180.50,
            status: 'Shipped',
            statusIcon: FiTruck,
            statusColor: 'text-blue-600',
            statusBgColor: 'bg-blue-100',
            items: [
              {
                name: 'Cashew Nuts',
                quantity: 1,
                price: 180.50,
                image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=100&h=100&fit=crop'
              }
            ]
          }
        ]);
      }
      
      setIsLoading(false);
    };

    initializeOrders();
  }, [orderHistory, isLoaded]);

  // Filter orders based on selected filter
  const filteredOrders = displayOrders.filter(order => {
    if (filter === 'all') return true;
    return order.status.toLowerCase() === filter;
  });

  const filterOptions = [
    { key: 'all', label: 'All Orders', count: displayOrders.length },
    { key: 'delivered', label: 'Delivered', count: displayOrders.filter(o => o.status.toLowerCase() === 'delivered').length },
    { key: 'processing', label: 'Processing', count: displayOrders.filter(o => o.status.toLowerCase() === 'processing').length },
    { key: 'shipped', label: 'Shipped', count: displayOrders.filter(o => o.status.toLowerCase() === 'shipped').length }
  ];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" text="Loading your orders..." />
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
      <Navbar />
      <UserDetailsPopup />

      <div className="container-custom py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/account" className="p-2 hover:bg-white rounded-xl transition-colors mr-3">
            <FiArrowLeft className="w-6 h-6 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-neutral-900">My Orders</h1>
            <p className="text-sm text-neutral-600">Track and manage your order history</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="card p-2 mb-6">
          <div className="flex overflow-x-auto space-x-1">
            {filterOptions.map(option => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  filter === option.key
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {option.label}
                {option.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-200 text-primary-800 rounded-full text-xs">
                    {option.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className="card-interactive overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-neutral-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-neutral-900">Order #{order.id}</h3>
                      <p className="text-sm text-neutral-500">{new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl ${order.statusBgColor}`}>
                        <order.statusIcon className={`w-4 h-4 ${order.statusColor}`} />
                        <span className={`text-sm font-medium ${order.statusColor}`}>{order.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-700">AED {order.total.toFixed(2)}</span>
                    <span className="text-sm text-neutral-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-xl">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shadow-soft">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-900">{item.name}</h4>
                          <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-900">AED {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="p-6 bg-neutral-50 border-t border-neutral-100">
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View Details
                    </Link>
                    <div className="flex space-x-3">
                      <button className="btn-outline btn-sm">
                        Reorder
                      </button>
                      {order.status.toLowerCase() === 'delivered' && (
                        <button className="btn-primary btn-sm">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card p-12 text-center">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiShoppingBag className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                {filter === 'all' ? 'No orders yet' : `No ${filter} orders`}
              </h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                {filter === 'all'
                  ? "Start shopping to see your orders here. Explore our premium collection!"
                  : `You don't have any ${filter} orders at the moment.`
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" className="btn-primary">
                  <FiShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
                </Link>
                {filter !== 'all' && (
                  <button
                    onClick={() => setFilter('all')}
                    className="btn-outline"
                  >
                    View All Orders
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
