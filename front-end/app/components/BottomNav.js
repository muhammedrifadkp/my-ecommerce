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

  // Enhanced navigation items with search for mobile
  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: FiHome,
      activeColor: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      name: 'Search',
      href: '/search',
      icon: FiSearch,
      activeColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
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
      name: 'Wishlist',
      href: '/wishlist',
      icon: FiHeart,
      activeColor: 'text-accent-600',
      bgColor: 'bg-accent-50'
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
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 lg:hidden ${isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
      {/* Enhanced background with better blur effect */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-t border-neutral-200/60 shadow-soft"></div>

      {/* Navigation Content - Enhanced for better touch targets */}
      <div className="relative px-4 py-3 safe-area-pb">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 group min-w-[4rem] ${isActive
                  ? `${item.activeColor} ${item.bgColor} scale-105 shadow-soft focus:ring-primary-500`
                  : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-500'
                  }`}
                aria-label={`${item.name}${item.badge ? ` (${item.badge} items)` : ''}`}
              >
                {/* Enhanced active indicator */}
                {isActive && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-current rounded-full animate-pulse-soft"></div>
                )}

                {/* Icon container with better spacing */}
                <div className="relative flex justify-center items-center w-8 h-8 mb-1">
                  <Icon className={`transition-all duration-300 ${isActive ? 'text-xl' : 'text-lg group-hover:text-xl'
                    }`} aria-hidden="true" />

                  {/* Enhanced badge for cart */}
                  {item.badge > 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-gradient-secondary text-white text-xs font-medium rounded-full min-w-[1.25rem] h-5 flex items-center justify-center shadow-medium animate-bounce-soft px-1"
                      aria-hidden="true"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}

                  {/* Active state animation */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-current opacity-10 animate-ping"></div>
                  )}
                </div>

                {/* Label with better typography */}
                <span className={`text-xs font-medium transition-all duration-300 text-center ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                  }`}>
                  {item.name}
                </span>

                {/* Enhanced hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
