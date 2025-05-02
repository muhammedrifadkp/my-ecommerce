'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { FiMapPin, FiShoppingCart } from 'react-icons/fi';
import { HiOutlineUser } from 'react-icons/hi';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="bg-green-600 px-4 pt-10 pb-6 text-white relative">
      <div className="flex items-center justify-between mb-4">
      <Link href="/" className="text-2xl font-bold">
    <h1>FreshMarket</h1>
  </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <FiShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/admin/login">
            <HiOutlineUser className="text-2xl" />
          </Link>
        </div>
      </div>
      <div className="flex items-center mb-3 text-sm">
        <FiMapPin className="mr-1" />
        <span>Your Local Fresh Market</span>
      </div>
    </header>
  );
}