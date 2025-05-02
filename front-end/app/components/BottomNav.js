'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingBag, FiHeart, FiUser } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navItems = [
    { name: 'Home', href: '/', icon: FiHome },
    { name: 'Categories', href: '/categories', icon: FiShoppingBag },
    { name: 'Cart', href: '/cart', icon: FiShoppingCart, badge: cartCount },
    { name: 'Account', href: '/account', icon: FiUser },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
  <div className="flex justify-between items-center">
    {navItems.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={`flex flex-col items-center justify-center flex-1 ${
          pathname === item.href ? 'text-green-600' : 'text-gray-500'
        }`}
      >
        <div className="relative flex justify-center items-center w-6 h-6 mb-1">
          <item.icon className="text-xl" />
          {item.badge > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </div>
        <span className="text-xs leading-none">{item.name}</span>
      </Link>
    ))}
  </div>
</div>

  );
}
