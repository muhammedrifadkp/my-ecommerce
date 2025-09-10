'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiGrid, FiList, FiFilter, FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { HiOutlineAdjustments, HiOutlineSortDescending } from 'react-icons/hi';
import CompactProductCard from '../components/CompactProductCard';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';

// Category configuration with design system integration
const categoryConfig = {
  'premium-dry-fruits': {
    title: 'Premium Dry Fruits',
    subtitle: 'Nature\'s Finest Selection',
    description: 'Hand-picked premium dried fruits from the world\'s best orchards',
    gradient: 'from-purple-600/90 via-purple-500/80 to-pink-500/70',
    bgGradient: 'from-purple-50 to-pink-50',
    accentColor: 'purple',
    icon: '🍇',
    bgImage: '/banners/Premium-Dry-Fruits.jpg'
  },
  'nuts-seeds': {
    title: 'Nuts & Seeds',
    subtitle: 'Artisan Quality',
    description: 'Carefully selected nuts and seeds for health-conscious connoisseurs',
    gradient: 'from-amber-600/90 via-orange-500/80 to-yellow-500/70',
    bgGradient: 'from-amber-50 to-orange-50',
    accentColor: 'amber',
    icon: '🥜',
    bgImage: '/banners/Luxury-Nuts-Seeds.jpg'
  },
  'dates-exotic': {
    title: 'Dates & Exotic',
    subtitle: 'Royal Heritage',
    description: 'Rare Medjool dates and exotic delicacies from ancient groves',
    gradient: 'from-amber-800/90 via-brown-600/80 to-orange-700/70',
    bgGradient: 'from-emerald-50 to-teal-50',
    accentColor: 'emerald',
    icon: '🌴',
    bgImage: '/banners/Exotic-Dates-Collection.webp'
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const config = categoryConfig[category] || categoryConfig['premium-dry-fruits'];

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedSort, setSelectedSort] = useState('name');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const allProducts = await response.json();

        // Filter products by category
        const categoryProducts = allProducts.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );

        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (selectedSort) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src={config.bgImage}
              alt={config.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient}`} />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-3 text-sm text-white/80 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{config.title}</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <span className="text-4xl lg:text-5xl mr-4">{config.icon}</span>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium uppercase tracking-wider">
                  Premium Collection
                </span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {config.title}
            </h1>

            <p className="text-xl lg:text-2xl text-white/90 font-medium mb-4">
              {config.subtitle}
            </p>

            <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
              {config.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">{products.length}+</div>
                <div className="text-sm text-white/70">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-white/70">Natural</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">24h</div>
                <div className="text-sm text-white/70">Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header with Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Our {config.title}
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl">
                Discover our carefully curated selection of premium {config.title.toLowerCase()}
                sourced from the finest regions worldwide.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode */}
              <div className="flex items-center bg-white rounded-xl shadow-sm border border-neutral-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-l-xl transition-all ${viewMode === 'grid'
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-r-xl transition-all ${viewMode === 'list'
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <HiOutlineSortDescending className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'
                : 'space-y-4'
              }`}>
              {sortedProducts.map(product => (
                <div key={product._id} className={viewMode === 'list' ? 'max-w-4xl mx-auto' : ''}>
                  {viewMode === 'grid' ? (
                    <CompactProductCard product={product} />
                  ) : (
                    <ListProductCard product={product} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState category={config.title} />
          )}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}

// List view product card component
function ListProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center gap-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden flex-shrink-0">
          <Image
            src={product.image || '/images/products/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              {product.category && (
                <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${product.category?.toLowerCase() === 'premium-dry-fruits' ? 'bg-purple-100 text-purple-800' :
                    product.category?.toLowerCase() === 'nuts-seeds' ? 'bg-amber-100 text-amber-800' :
                      product.category?.toLowerCase() === 'dates-exotic' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-neutral-100 text-neutral-800'
                  }`}>
                  {product.category}
                </span>
              )}
            </div>
            <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <FiHeart className="w-5 h-5 text-neutral-400 hover:text-red-500" />
            </button>
          </div>

          {product.description && (
            <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-2xl font-bold text-primary-600">
                  AED {product.price}
                </span>
                <span className="text-sm text-neutral-500 ml-1">
                  per {product.quantityUnit}
                </span>
              </div>

              {product.rating && (
                <div className="flex items-center gap-1">
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-neutral-700">{product.rating}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1, product.price)}
              className="btn-primary flex items-center gap-2 px-6 py-3"
            >
              <FiShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({ category }) {
  return (
    <div className="text-center py-16 lg:py-24">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
          No {category} Found
        </h3>
        <p className="text-neutral-600 mb-8">
          We couldn't find any products in this category at the moment.
          Please check back later or explore our other collections.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <FiArrowLeft className="w-4 h-4" />
          Browse All Categories
        </Link>
      </div>
    </div>
  );
}