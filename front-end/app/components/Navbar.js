'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiShoppingCart,
  FiSearch,
  FiX,
  FiUser,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiMail
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard navigation and accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }

      // Quick search with Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);



  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (query.length >= 2) {
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    } else if (query.length > 0) {
      // Show error for short queries
      alert('Please enter at least 2 characters to search');
    }
  }, [searchQuery, router]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => {
      if (!prev) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      return !prev;
    });
  }, []);

  const quickLinks = [
    { name: 'Track Order', href: '/track-order', icon: '📦' },
    { name: 'Help Center', href: '/help', icon: '💬' },
    { name: 'About Us', href: '/about', icon: 'ℹ️' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ];

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary-600 text-white px-4 py-2 rounded-md z-[60] focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-2xl' : 'bg-gradient-to-r from-purple-600 via-primary-600 to-secondary-600 shadow-2xl shadow-purple-500/20'}`}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Information Bar */}
          <div className={`py-1.5 border-b transition-all duration-500 backdrop-blur-sm ${isScrolled ? 'border-neutral-200/30 bg-white/50' : 'border-white/30 bg-white/10'
            }`}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className={`hidden md:flex items-center space-x-2 transition-colors duration-300 ${isScrolled ? 'text-neutral-600' : 'text-white/90'}`}>
                  <FiMapPin className="w-3 h-3" aria-hidden="true" />
                  <span className="font-medium">Dubai, UAE</span>
                </div>
                <div className={`hidden sm:flex items-center space-x-2 transition-colors duration-300 ${isScrolled ? 'text-neutral-600' : 'text-white/90'}`}>
                  <FiPhone className="w-3 h-3" aria-hidden="true" />
                  <a href="tel:+971501234567" className="font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-white/40 rounded">+971 50 123 4567</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/track-order"
                  className={`hidden lg:block hover:underline transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1 ${isScrolled ? 'text-neutral-600 hover:text-primary-600 focus:ring-primary-500' : 'text-white/90 hover:text-white focus:ring-white/40'}`}
                >
                  Track Order
                </Link>
                <a
                  href="mailto:support@almashhour.com"
                  className={`hidden lg:flex items-center space-x-1 hover:underline transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1 ${isScrolled ? 'text-neutral-600 hover:text-primary-600 focus:ring-primary-500' : 'text-white/90 hover:text-white focus:ring-white/40'}`}
                >
                  <FiMail className="w-3 h-3" aria-hidden="true" />
                  <span>Support</span>
                </a>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="py-2">
            <div className="flex items-center justify-between">
              {/* Enhanced Logo */}
              <Link
                href="/"
                className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg p-2 transition-all duration-300"
                aria-label="Al MASHHOUR - Premium dry fruits and nuts - Go to homepage"
              >
                <div className="relative">
                  {/* Logo container with glow effect */}
                  <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 overflow-hidden ${isScrolled ? 'bg-white shadow-lg group-hover:shadow-xl' : 'bg-white/95 backdrop-blur-sm group-hover:bg-white'}`}>
                    <Image
                      src="/logo-only.png"
                      alt="Al MASHHOUR Logo"
                      width={32}
                      height={32}
                      className="object-contain transform group-hover:scale-110 transition-all duration-300"
                      priority
                    />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500"></div>
                </div>

                {/* Company name and tagline */}
                <div className="hidden sm:block">
                  {/* Use company name image for larger screens */}
                  <div className="hidden lg:block">
                    <Image
                      src="/name-only.png"
                      alt="Al MASHHOUR"
                      width={140}
                      height={32}
                      className={`object-contain transition-all duration-300 ${isScrolled ? 'opacity-90' : 'brightness-0 invert'}`}
                      priority
                    />
                  </div>

                  {/* Fallback text for medium screens */}
                  <div className="lg:hidden">
                    <h1 className={`text-xl font-display font-bold transition-all duration-300 ${isScrolled ? 'bg-gradient-primary bg-clip-text text-transparent' : 'text-white'}`}>
                      Al MASHHOUR
                    </h1>
                  </div>

                  <p className={`text-xs transition-colors duration-300 font-medium mt-0.5 ${isScrolled ? 'text-neutral-500' : 'text-white/80'}`}>
                    Premium Dry Fruits & Nuts
                  </p>
                </div>

                {/* Mobile: Show text-based logo and name */}
                <div className="sm:hidden">
                  <h1 className={`text-lg font-display font-bold transition-all duration-300 ${isScrolled ? 'bg-gradient-primary bg-clip-text text-transparent' : 'text-white'}`}>
                    Al MASHHOUR
                  </h1>
                  <p className={`text-xs transition-colors duration-300 font-medium ${isScrolled ? 'text-neutral-500' : 'text-white/80'}`}>
                    Premium Dry Fruits & Nuts
                  </p>
                </div>
              </Link>

              {/* Enhanced Desktop Navigation Menu */}
              <nav className="hidden lg:flex items-center space-x-0" role="navigation" aria-label="Main navigation">
                {[
                  {
                    name: 'Premium Dry Fruits',
                    href: '/premium-dry-fruits',
                    icon: '🍇',
                    description: 'Finest quality dried fruits'
                  },
                  {
                    name: 'Nuts & Seeds',
                    href: '/nuts-seeds',
                    icon: '🥜',
                    description: 'Fresh nuts and healthy seeds'
                  },
                  {
                    name: 'Dates & Exotic',
                    href: '/dates-exotic',
                    icon: '🌴',
                    description: 'Premium dates and exotic fruits'
                  },
                  {
                    name: 'Premium Gifts',
                    href: '/gifts',
                    icon: '🎁',
                    description: 'Luxury gift packages'
                  },
                ].map((category, index) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={`relative flex items-center space-x-1 px-2 py-1.5 rounded-lg transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 group overflow-hidden ${isScrolled ? 'text-neutral-700 hover:text-white hover:shadow-lg focus:ring-primary-500' : 'text-white/90 hover:text-white hover:shadow-lg focus:ring-white/40'}`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Animated background */}
                    <div className={`absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100 ${isScrolled ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-white/20 backdrop-blur-sm'}`} />
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 blur-xl" />

                    <span className="relative text-base group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" aria-hidden="true">
                      {category.icon}
                    </span>
                    <span className="relative font-medium text-xs tracking-wide">{category.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Enhanced Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-6xl mx-1 lg:mx-2">
                <form onSubmit={handleSearch} className="relative w-full group" role="search">
                  <label htmlFor="desktop-search" className="sr-only">Search for products</label>
                  <div className="relative">
                    {/* Glow effect for search */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                    <input
                      id="desktop-search"
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`relative w-full pl-14 pr-28 py-3 text-base rounded-2xl border-2 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-offset-2 hover:shadow-2xl ${isScrolled ? 'bg-white/90 backdrop-blur-xl text-neutral-900 placeholder-neutral-500 border-neutral-200/50 focus:bg-white focus:shadow-2xl focus:ring-primary-500/50 focus:border-primary-300' : 'bg-white/20 backdrop-blur-xl text-white placeholder-white/80 border-white/30 focus:bg-white/30 focus:ring-white/30 focus:border-white/50'}`}
                      aria-describedby="search-description"
                    />
                    <span id="search-description" className="sr-only">
                      Search our collection of premium dry fruits, nuts, and dates
                    </span>
                    <FiSearch
                      className={`absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-500 group-hover:scale-110 ${isScrolled ? 'text-neutral-500 group-hover:text-primary-500' : 'text-white/80 group-hover:text-white'}`}
                      aria-hidden="true"
                    />
                    <button
                      type="submit"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 rounded-xl transition-all duration-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 ${isScrolled ? 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl focus:ring-primary-500' : 'bg-white/25 hover:bg-white/35 text-white backdrop-blur-sm focus:ring-white/40 shadow-lg'}`}
                      aria-label="Submit search"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Search Button - Mobile */}
                <button
                  onClick={toggleSearch}
                  className={`block md:hidden p-3 rounded-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110 shadow-lg min-w-[48px] min-h-[48px] flex items-center justify-center ${isScrolled ? 'text-neutral-700 bg-white hover:text-white hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 focus:ring-primary-500 hover:shadow-xl border border-neutral-200 shadow-md' : 'text-white bg-white/25 backdrop-blur-sm hover:bg-white/35 focus:ring-white/40 hover:shadow-xl border border-white/40 shadow-lg'}`}
                  aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                  aria-expanded={isSearchOpen}
                >
                  {isSearchOpen ? (
                    <FiX className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <FiSearch className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className={`hidden sm:flex p-3 rounded-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110 group relative ${isScrolled ? 'text-neutral-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 focus:ring-primary-500 hover:shadow-lg' : 'text-white hover:text-white hover:bg-white/20 focus:ring-white/40 hover:shadow-lg'}`}
                  aria-label="View wishlist"
                >
                  <FiHeart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className={`relative p-3 rounded-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110 group ${isScrolled ? 'text-neutral-600 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 focus:ring-primary-500 hover:shadow-lg' : 'text-white hover:text-white hover:bg-white/20 focus:ring-white/40 hover:shadow-lg'}`}
                  aria-label={`Shopping cart${cartCount > 0 ? ` with ${cartCount} items` : ' (empty)'}`}
                >
                  <FiShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  {cartCount > 0 && (
                    <>
                      <span
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-bold shadow-lg px-1 animate-pulse"
                        aria-hidden="true"
                      >
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                      <span className="sr-only">{cartCount} items in cart</span>
                    </>
                  )}
                </Link>

                {/* User Account */}
                <Link
                  href="/account"
                  className={`hidden sm:flex p-3 rounded-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-110 group ${isScrolled ? 'text-neutral-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 focus:ring-primary-500 hover:shadow-lg' : 'text-white hover:text-white hover:bg-white/20 focus:ring-white/40 hover:shadow-lg'}`}
                  aria-label="User account"
                >
                  <FiUser className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </Link>

                {/* Mobile Menu Toggle - Hidden since we use bottom nav */}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="absolute top-0 left-0 right-0 bg-white p-4 shadow-2xl animate-slide-down border-b border-neutral-200">
            <form onSubmit={handleSearch} className="relative">
              <label htmlFor="mobile-search" className="sr-only">Search for products</label>
              <input
                id="mobile-search"
                ref={searchInputRef}
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-base rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
                autoFocus
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" aria-hidden="true" />
            </form>

            {/* Search suggestions/tips */}
            <div className="mt-4 px-1">
              <p className="text-sm text-neutral-600 font-medium">🔍 Search our premium collection</p>
              <p className="text-xs text-neutral-500 mt-1">• Enter at least 2 characters to search</p>
              <p className="text-xs text-neutral-500">• Try keywords like "almonds", "dates", or "nuts"</p>
              <p className="text-xs text-neutral-400 mt-2">Tap the X button in the top-right to close</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Mobile Menu Overlay - Hidden since we use bottom nav */}

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24 lg:h-28"></div>
    </>
  );
}