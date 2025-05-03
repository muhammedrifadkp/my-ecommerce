'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useUser } from '../context/UserContext';
import UserDetailsPopup from '../components/UserDetailsPopup';
import { FiUser, FiPackage, FiHeart, FiLogOut, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function AccountPage() {
  const { userDetails, checkUserDetails } = useUser();
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    phone: 'Not provided',
    address: 'Not provided',
    profileImage: 'https://tse4.mm.bing.net/th?id=OIP.Wim1Ar6paI5-FdmrOedMMAHaHa&pid=Api&P=0&h=180'
  });

  // Check if user details exist when the component mounts
  useEffect(() => {
    checkUserDetails();

    // Update user state when userDetails changes
    if (userDetails) {
      setUser({
        name: userDetails.name || 'Guest User',
        email: userDetails.email || 'guest@example.com',
        phone: userDetails.phone || 'Not provided',
        address: userDetails.address || 'Not provided',
        profileImage: 'https://tse4.mm.bing.net/th?id=OIP.Wim1Ar6paI5-FdmrOedMMAHaHa&pid=Api&P=0&h=180'
      });
    }
  }, [userDetails, checkUserDetails]);

  // Get order history from UserContext
  const { orderHistory } = useUser();

  // Sample orders to show if no real orders exist
  const sampleOrders = [
    {
      id: 'SAMPLE-001',
      date: '15 May 2023',
      total: 450.75,
      status: 'Sample',
      items: [
        { name: 'Fresh Tomatoes', quantity: 2, price: 80 },
        { name: 'Organic Apples', quantity: 1, price: 120 },
        { name: 'Chicken Breast', quantity: 1, price: 250.75 }
      ]
    }
  ];

  // Use real orders if available, otherwise use sample orders
  const orders = orderHistory.length > 0 ? orderHistory : (userDetails ? [] : sampleOrders);

  return (
    <div className="bg-white min-h-screen pb-16">
      <Navbar />
      <UserDetailsPopup />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 mt-4">My Account</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
              <Image
                src={user.profileImage}
                alt={user.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <FiPhone className="text-gray-500 mr-2" />
              <span className="text-sm">{user.phone}</span>
            </div>
            <div className="flex items-center mb-2">
              <FiMail className="text-gray-500 mr-2" />
              <span className="text-sm">{user.email}</span>
            </div>
            <div className="flex items-start">
              <FiMapPin className="text-gray-500 mr-2 mt-1" />
              <span className="text-sm">{user.address}</span>
            </div>
          </div>
        </div>

        {/* Account Navigation */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/account/orders" className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <FiPackage className="text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">My Orders</h3>
              <p className="text-xs text-gray-500">View order history</p>
            </div>
          </Link>

          <Link href="/account/wishlist" className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <FiHeart className="text-red-600" />
            </div>
            <div>
              <h3 className="font-medium">Wishlist</h3>
              <p className="text-xs text-gray-500">Saved items</p>
            </div>
          </Link>

          <Link href="/account/profile" className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FiUser className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Profile</h3>
              <p className="text-xs text-gray-500">Edit personal details</p>
            </div>
          </Link>

          <Link href="/logout" className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
              <FiLogOut className="text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium">Logout</h3>
              <p className="text-xs text-gray-500">Sign out of account</p>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-sm font-medium">Order #{order.id}</span>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">AED {order.total.toFixed(2)}</span>
                  <p className="text-xs text-green-600">{order.status}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-2 mt-2">
                <p className="text-xs text-gray-500 mb-1">Items:</p>
                <ul className="text-sm">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between py-1">
                      <span>{item.name} × {item.quantity}</span>
                      <span>AED {item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between">
                <Link href={`/account/orders/${order.id}`} className="text-green-600 text-sm">
                  View Details
                </Link>
                <Link href={`/account/orders/${order.id}/reorder`} className="text-green-600 text-sm">
                  Reorder
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
