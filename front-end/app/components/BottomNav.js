'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiHome, FiShoppingBag, FiShoppingCart, FiUser, FiHeart, FiSearch } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide bottom nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: FiHome,
      activeColor: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      name: 'Categories',
      href: '/categories',
      icon: FiShoppingBag,
      activeColor: 'text-secondary-600',
      bgColor: 'bg-secondary-50'
    },
    {
      name: 'Search',
      href: '/search',
      icon: FiSearch,
      activeColor: 'text-accent-600',
      bgColor: 'bg-accent-50'
    },
    {
      name: 'Cart',
      href: '/cart',
      icon: FiShoppingCart,
      badge: cartCount,
      activeColor: 'text-success-600',
      bgColor: 'bg-success-50'
    },
    {
      name: 'Account',
      href: '/account',
      icon: FiUser,
      activeColor: 'text-neutral-600',
      bgColor: 'bg-neutral-50'
    },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/50"></div>

      {/* Navigation Content */}
      <div className="relative px-4 py-2 safe-area-pb">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? `${item.activeColor} ${item.bgColor} scale-105`
                    : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full animate-pulse"></div>
                )}

                {/* Icon container */}
                <div className="relative flex justify-center items-center w-8 h-8 mb-1">
                  <Icon className={`transition-all duration-300 ${
                    isActive ? 'text-xl' : 'text-lg group-hover:text-xl'
                  }`} />

                  {/* Badge for cart */}
                  {item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-secondary text-white text-[10px] font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-medium animate-bounce-soft">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}

                  {/* Ripple effect on active */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-current opacity-10 animate-ping"></div>
                  )}
                </div>

                {/* Label */}
                <span className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                }`}>
                  {item.name}
                </span>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Floating Action Button for Quick Add */}
        <button className="absolute -top-8 right-6 w-12 h-12 bg-gradient-primary text-white rounded-full shadow-large hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group">
          <span className="text-xl group-hover:rotate-90 transition-transform duration-300">+</span>
        </button>
      </div>
    </div>
  );
}
