'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronDown, FiX, FiShoppingCart, FiTrendingUp, FiDollarSign, FiPackage } from 'react-icons/fi';
import { HiSparkles, HiStar } from 'react-icons/hi';
import CompactProductCard from '../components/CompactProductCard';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category).filter(Boolean))];
    return ['all', ...uniqueCategories];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  // Stats
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const averagePrice = products.length > 0 ? 
      (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : 0;
    const categoriesCount = categories.length - 1; // Excluding 'all'
    
    return {
      total: totalProducts,
      average: averagePrice,
      categories: categoriesCount,
      filtered: filteredProducts.length
    };
  }, [products, filteredProducts, categories]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('name');
  };

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
      <Navbar />

      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-display font-bold mb-1">Premium Products</h1>
                <p className="text-primary-100 text-sm">Discover our finest selection of quality items</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="w-6 h-6 text-yellow-300" />
              <span className="text-sm font-medium">{stats.total} Items</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-soft">
        <div className="px-4 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-3 flex-1">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.replace('-', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isFilterOpen ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <FiFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-neutral-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-primary-600 shadow-soft' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-white text-primary-600 shadow-soft' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {isFilterOpen && (
            <div className="mt-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-200 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Price Range (AED)</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="0"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="input flex-1 text-sm py-2"
                      placeholder="Min"
                    />
                    <span className="text-neutral-400">to</span>
                    <input
                      type="number"
                      min="0"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="input flex-1 text-sm py-2"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="btn-outline btn-sm w-full"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 1000) && (
            <div className="mt-4 flex items-center space-x-2 text-sm">
              <span className="text-neutral-600">Active filters:</span>
              {searchTerm && (
                <span className="badge-primary">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-2 hover:text-primary-900">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="badge-secondary">
                  {selectedCategory.replace('-', ' ').toUpperCase()}
                  <button onClick={() => setSelectedCategory('all')} className="ml-2 hover:text-secondary-900">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results Summary */}
      <section className="px-4 py-3 bg-white border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Showing <span className="font-semibold text-neutral-900">{filteredProducts.length}</span> of{' '}
            <span className="font-semibold text-neutral-900">{stats.total}</span> products
          </div>
          {filteredProducts.length !== stats.total && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Show all products
            </button>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <LoadingSpinner />
            <div className="text-center">
              <p className="text-neutral-600 font-medium">Loading premium products...</p>
              <p className="text-sm text-neutral-400">Please wait while we fetch the best items for you</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' 
              : 'space-y-4'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {viewMode === 'grid' ? (
                  <CompactProductCard product={product} />
                ) : (
                  <div className="flex bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {product.category && (
                              <span className="badge-primary text-xs">
                                {product.category.replace('-', ' ').toUpperCase()}
                              </span>
                            )}
                            <div className="flex items-center space-x-1">
                              <HiStar className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-neutral-600">4.5</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col">
                              <span className="text-xl font-bold text-primary-700">
                                AED {product.price}
                              </span>
                              <span className="text-sm text-neutral-500">
                                per {product.quantityUnit}
                              </span>
                            </div>
                            <button className="btn-primary btn-sm">
                              <FiShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                        <div className="ml-4 w-24 h-24 rounded-xl overflow-hidden bg-neutral-100">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl">📦</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
              <FiPackage className="w-12 h-12 text-neutral-400" />
            </div>
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
              No products found
            </h3>
            <p className="text-neutral-600 mb-6 max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 1000
                ? "Try adjusting your filters to see more products"
                : "We're currently updating our inventory. Please check back soon!"
              }
            </p>
            {(searchTerm || selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 1000) && (
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
            <Link href="/" className="btn-outline ml-4">
              Browse Home
            </Link>
          </div>
        )}
      </section>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
