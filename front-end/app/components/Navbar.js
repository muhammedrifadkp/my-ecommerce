'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiShoppingCart, FiMapPin, FiSearch, FiMenu, FiX, FiBell } from 'react-icons/fi';
import { HiOutlineUser, HiOutlineHeart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-medium border-b border-neutral-200/50'
          : 'bg-gradient-primary'
      }`}>
        <div className="container-custom">
          {/* Top Bar */}
          <div className={`py-3 border-b transition-colors duration-300 ${
            isScrolled ? 'border-neutral-200/30' : 'border-white/20'
          }`}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className={`flex items-center space-x-1 ${
                  isScrolled ? 'text-neutral-600' : 'text-white/90'
                }`}>
                  <FiMapPin className="w-4 h-4" />
                  <span>Deliver to: Dubai, UAE</span>
                </div>
                <div className={`hidden md:flex items-center space-x-1 ${
                  isScrolled ? 'text-neutral-600' : 'text-white/90'
                }`}>
                  <span>📞 +971 50 123 4567</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/track-order"
                  className={`hidden md:block hover:underline transition-colors ${
                    isScrolled ? 'text-neutral-600 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Track Order
                </Link>
                <Link
                  href="/help"
                  className={`hidden md:block hover:underline transition-colors ${
                    isScrolled ? 'text-neutral-600 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Help
                </Link>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg">🛒</span>
                </div>
                <div>
                  <h1 className={`text-2xl font-display font-bold transition-colors duration-300 ${
                    isScrolled ? 'text-gradient-primary' : 'text-white'
                  }`}>
                    FreshMarket
                  </h1>
                  <p className={`text-xs transition-colors duration-300 ${
                    isScrolled ? 'text-neutral-500' : 'text-white/70'
                  }`}>
                    Premium Groceries
                  </p>
                </div>
              </Link>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search for fresh vegetables, fruits, meat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all duration-300"
                  />
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-xl transition-all duration-200 text-sm font-medium"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Search Button - Mobile */}
                <button className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors">
                  <FiSearch className={`w-6 h-6 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
                </button>

                {/* Notifications */}
                <button className="relative p-2 rounded-xl hover:bg-white/10 transition-colors group">
                  <FiBell className={`w-6 h-6 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></span>
                </button>

                {/* Wishlist */}
                <Link href="/wishlist" className="relative p-2 rounded-xl hover:bg-white/10 transition-colors group">
                  <HiOutlineHeart className={`w-6 h-6 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
                </Link>

                {/* Cart */}
                <Link href="/cart" className="relative p-2 rounded-xl hover:bg-white/10 transition-colors group">
                  <FiShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-bounce-soft">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* User Account */}
                <Link href="/account" className="relative p-2 rounded-xl hover:bg-white/10 transition-colors group">
                  <HiOutlineUser className={`w-6 h-6 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <FiX className={`w-6 h-6 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
                  ) : (
                    <FiMenu className={`w-6 h-6 ${isScrolled ? 'text-neutral-600' : 'text-white'}`} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Category Navigation - Desktop */}
          <div className="hidden md:block pb-4">
            <nav className="flex items-center space-x-8">
              {[
                { name: 'Vegetables', href: '/vegetables', emoji: '🥬' },
                { name: 'Fruits', href: '/fruits', emoji: '🍎' },
                { name: 'Meat & Poultry', href: '/meat', emoji: '🥩' },
                { name: 'Dairy', href: '/dairy', emoji: '🥛' },
                { name: 'Bakery', href: '/bakery', emoji: '🍞' },
                { name: 'Beverages', href: '/beverages', emoji: '🥤' },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-white/10 group ${
                    isScrolled ? 'text-neutral-600 hover:text-primary-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {category.emoji}
                  </span>
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl">
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input"
                />
                <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              </form>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900 mb-4">Categories</h3>
                {[
                  { name: 'Vegetables', href: '/vegetables', emoji: '🥬' },
                  { name: 'Fruits', href: '/fruits', emoji: '🍎' },
                  { name: 'Meat & Poultry', href: '/meat', emoji: '🥩' },
                  { name: 'Dairy', href: '/dairy', emoji: '🥛' },
                  { name: 'Bakery', href: '/bakery', emoji: '🍞' },
                  { name: 'Beverages', href: '/beverages', emoji: '🥤' },
                ].map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-2xl">{category.emoji}</span>
                    <span className="font-medium text-neutral-700">{category.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Links */}
              <div className="space-y-2 pt-4 border-t border-neutral-200">
                {[
                  { name: 'Track Order', href: '/track-order' },
                  { name: 'Help & Support', href: '/help' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block p-3 rounded-xl hover:bg-neutral-50 transition-colors text-neutral-700 font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-32 md:h-40"></div>
    </>
  );
}