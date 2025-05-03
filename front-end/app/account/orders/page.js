'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { useUser } from '../../context/UserContext';
import UserDetailsPopup from '../../components/UserDetailsPopup';
import { FiArrowLeft, FiPackage, FiTruck, FiCheck } from 'react-icons/fi';

export default function OrdersPage() {
  const { orderHistory, checkUserDetails } = useUser();
  const [displayOrders, setDisplayOrders] = useState([]);

  // Get status icon and color based on status
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Delivered':
        return { icon: FiCheck, color: 'text-green-600' };
      case 'In Transit':
        return { icon: FiTruck, color: 'text-blue-600' };
      default:
        return { icon: FiPackage, color: 'text-orange-600' };
    }
  };

  // Process orders to add status icons and colors
  useEffect(() => {
    // Check if user details exist
    checkUserDetails();

    // Process real orders if available
    if (orderHistory && orderHistory.length > 0) {
      const processedOrders = orderHistory.map(order => {
        const { icon, color } = getStatusInfo(order.status);
        return {
          ...order,
          statusIcon: icon,
          statusColor: color
        };
      });
      setDisplayOrders(processedOrders);
    } else {
      // Sample orders for demonstration
      setDisplayOrders([
        {
          id: 'SAMPLE-001',
          date: '15 May 2023',
          total: 450.75,
          status: 'Delivered',
          statusIcon: FiCheck,
          statusColor: 'text-green-600',
          items: [
            {
              name: 'Fresh Tomatoes',
              quantity: 2,
              price: 80,
              image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=100&h=100&fit=crop&auto=format'
            },
            {
              name: 'Organic Apples',
              quantity: 1,
              price: 120,
              image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=100&h=100&fit=crop&auto=format'
            }
          ]
        }
      ]);
    }
  }, [orderHistory, checkUserDetails]);

  return (
    <div className="bg-white min-h-screen pb-16">
      <Navbar />
      <UserDetailsPopup />

      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6 mt-4">
          <Link href="/account" className="mr-3">
            <FiArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {displayOrders.length > 0 ? (
            displayOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center">
                    <order.statusIcon className={`${order.statusColor} mr-1`} />
                    <span className={`text-sm ${order.statusColor}`}>{order.status}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                    <div className="relative w-12 h-12 rounded overflow-hidden mr-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">AED{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <span className="text-lg font-semibold">AED{order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="text-sm text-green-600"
                  >
                    View Details
                  </Link>
                  <button className="text-sm text-green-600">
                    Reorder
                  </button>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 mb-2">You don't have any orders yet.</p>
              <Link href="/" className="text-green-600 hover:text-green-800">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
