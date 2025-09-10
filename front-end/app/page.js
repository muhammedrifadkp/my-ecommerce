'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiStar, FiTrendingUp, FiShield, FiTruck, FiGift } from 'react-icons/fi';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ProductCard from './components/ProductCard';
import PromoCarousel from './components/PromoCarousel';
import CategoryImage from './components/CategoryImage';
import GiftSection from './components/GiftSection';

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  // Function to shuffle and select random products
  const shuffleProducts = (products, count = 8) => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // Function to refresh popular products with new random selection
  const refreshPopularProducts = () => {
    if (allProducts.length > 0) {
      const newSelection = shuffleProducts(allProducts, 8);
      setPopularProducts(newSelection);
    }
  };

  // Fetch popular products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const allProducts = await response.json();
          console.log('Products fetched successfully:', allProducts.length);
          
          // Store all products for future shuffling
          setAllProducts(allProducts);
          
          // Randomly shuffle and select 8 products
          const randomProducts = shuffleProducts(allProducts, 8);
          setPopularProducts(randomProducts);
        } else {
          throw new Error(`API responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch from API, using sample products:', error);
        
        // Sample fallback products when backend is not available
        const sampleProducts = [
          {
            _id: '1',
            name: 'Premium Almonds',
            category: 'nuts',
            price: '45',
            originalPrice: '55',
            quantityUnit: '500g',
            image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Premium California almonds, rich in protein and healthy fats',
            featured: true
          },
          {
            _id: '2',
            name: 'Medjool Dates',
            category: 'dates',
            price: '38',
            quantityUnit: '250g',
            image: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Large, soft and sweet Medjool dates from Jordan',
            featured: true
          },
          {
            _id: '3',
            name: 'Mixed Dried Fruits',
            category: 'dried-fruits',
            price: '42',
            quantityUnit: '300g',
            image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Exotic blend of dried apricots, figs, and cranberries'
          },
          {
            _id: '4',
            name: 'Turkish Pistachios',
            category: 'nuts',
            price: '65',
            originalPrice: '75',
            quantityUnit: '400g',
            image: 'https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Premium Turkish pistachios, perfectly roasted and salted'
          },
          {
            _id: '5',
            name: 'Cashew Nuts',
            category: 'nuts',
            price: '55',
            quantityUnit: '350g',
            image: 'https://images.pexels.com/photos/1571774/pexels-photo-1571774.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Creamy and buttery cashews from Vietnam'
          },
          {
            _id: '6',
            name: 'Premium Walnuts',
            category: 'nuts',
            price: '48',
            quantityUnit: '400g',
            image: 'https://images.pexels.com/photos/1326884/pexels-photo-1326884.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Fresh California walnuts, rich in omega-3 fatty acids'
          },
          {
            _id: '7',
            name: 'Dried Figs',
            category: 'dried-fruits',
            price: '52',
            quantityUnit: '300g',
            image: 'https://images.pexels.com/photos/5946030/pexels-photo-5946030.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Sweet and chewy Turkish figs, naturally sun-dried'
          },
          {
            _id: '8',
            name: 'Dried Apricots',
            category: 'dried-fruits',
            price: '35',
            quantityUnit: '250g',
            image: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Sweet and chewy Turkish apricots, naturally dried'
          }
        ];
        
        // Store sample products for shuffling
        setAllProducts(sampleProducts);
        
        // Display random selection of sample products
        const randomProducts = shuffleProducts(sampleProducts, 8);
        setPopularProducts(randomProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Premium categories with enhanced design
  const categories = [
    {
      id: 1,
      name: 'Premium Dry Fruits',
      description: 'Exotic selection of dried fruits',
      image: '/banners/Premium-Dry-Fruits.jpg',
      fallbackImage: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      gradient: 'from-purple-500 to-pink-500',
      icon: '🍇'
    },
    {
      id: 2,
      name: 'Nuts & Seeds',
      description: 'Premium nuts and healthy seeds',
      image: '/banners/Luxury-Nuts-Seeds.jpg',
      fallbackImage: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      gradient: 'from-amber-500 to-orange-500',
      icon: '🥜'
    },
    {
      id: 3,
      name: 'Dates & Exotic Items',
      description: 'Medjool dates and exotic treats',
      image: '/banners/Exotic-Dates-Collection.webp',
      fallbackImage: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      gradient: 'from-emerald-500 to-teal-500',
      icon: '🌴'
    }
  ];

  const features = [
    {
      icon: FiShield,
      title: 'Premium Quality',
      description: 'Hand-selected premium products with quality guarantee'
    },
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Free delivery within Dubai in 24 hours'
    },
    {
      icon: FiGift,
      title: 'Gift Packaging',
      description: 'Beautiful packaging for special occasions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <Navbar />

      {/* Premium Hero Section */}
      <section className="relative overflow-hidden min-h-[65vh] md:min-h-[60vh] flex items-center pt-8 md:pt-0">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500"></div>
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-secondary-400/20 rounded-full blur-xl animate-pulse-soft"></div>

          {/* Grain Texture Overlay */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="relative container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Hero Content */}
            <div className="text-white space-y-4 md:space-y-6 px-4 md:px-0">
              <div className="space-y-6 md:space-y-10">
                {/* <div className="badge-gradient inline-flex items-center space-x-2">
                  <FiStar className="w-4 h-4" />
                  <span>Premium Collection 2024</span>
                </div> */}

                <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold leading-tight pt-2 md:pt-6">
                  Premium
                  <span className="block text-gradient-secondary bg-clip-text text-transparent">
                    Dry Fruits
                  </span>
                  <span className="block text-2xl md:text-3xl lg:text-4xl font-light">& Luxury Nuts</span>
                </h1>

                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-xl leading-relaxed">
                  Discover our exquisite collection of hand-selected premium dry fruits,
                  luxury nuts, and exotic delicacies sourced from the finest regions worldwide.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/categories" className="btn-secondary btn-xl group">
                  <span>Explore Collection</span>
                  <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link href="/products" className="btn-outline text-white border-white/30 hover:bg-white/10 btn-xl">
                  View All Products
                </Link>
              </div>

              {/* Premium Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-4 md:pt-6 pb-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">50+</div>
                  <div className="text-xs md:text-sm text-white/70">Premium Varieties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">100%</div>
                  <div className="text-xs md:text-sm text-white/70">Natural & Pure</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">24h</div>
                  <div className="text-xs md:text-sm text-white/70">Fast Delivery</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:block hidden">
              <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/poster_with_logo.png" // REPLACE: Add your main hero image here
                  alt="Premium dry fruits and nuts collection"
                  fill
                  className={`object-cover transition-all duration-1000 ${heroImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  onLoad={() => setHeroImageLoaded(true)}
                  onError={() => {
                    // Fallback to external image if local fails
                    const img = document.querySelector('[alt="Premium dry fruits and nuts collection"]');
                    if (img) img.src = '/images/hero/hero-fallback.jpg'; // REPLACE: Add your fallback hero image here
                  }}
                  priority
                />
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Floating elements */}
                <div className="absolute top-8 right-8 glass rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-4 animate-float">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-white">Fresh Daily</span>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 glass bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 rounded-2xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center space-x-2">
                    <FiShield className="w-4 h-4 text-white" />
                    <span className="text-sm font-medium text-white">Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding-sm bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl shadow-colored-primary group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Carousel */}
      <section className="section-padding-sm">
        <div className="container-custom">
          <PromoCarousel />
        </div>
      </section>

      {/* Premium Categories Section */}
      <section className="section-padding bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="badge-primary inline-flex items-center space-x-2 mb-4">
              <FiTrendingUp className="w-4 h-4" />
              <span>Premium Collections</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
              Luxury Collections
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated premium selection of dry fruits and nuts
              from the world's finest regions, handpicked for exceptional quality and taste.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                href={`/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={category.id}
                className="group relative overflow-hidden rounded-3xl card-hover"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <CategoryImage
                    category={category}
                    className="h-full w-full"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                {/* Category Icon */}
                <div className="absolute top-6 right-6 w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{category.icon}</span>
                </div>

                {/* Category Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm group-hover:translate-y-[-2px] transition-transform duration-300">
                    {category.description}
                  </p>

                  <div className="flex items-center mt-4 text-white/80 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-medium">Explore Collection</span>
                    <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="badge-secondary inline-flex items-center space-x-2 mb-4">
                <FiStar className="w-4 h-4" />
                <span>Bestsellers</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
                Popular Products
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl">
                {allProducts.length > 0 ? (
                  `Random selection from our premium collection. Showing 8 of ${allProducts.length} products.`
                ) : (
                  'Our customers\' favorite premium selections, loved for their exceptional quality and exquisite taste.'
                )}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {allProducts.length > 0 && (
                <button
                  onClick={refreshPopularProducts}
                  className="btn-ghost flex items-center space-x-2 hover:bg-primary-50 hover:text-primary-700"
                  aria-label="Shuffle products"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="hidden lg:inline">Shuffle</span>
                </button>
              )}
              <Link
                href="/products"
                className="btn-outline hover:bg-primary-50 hover:border-primary-300 hidden lg:flex items-center space-x-2"
              >
                <span>View All</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card h-96 loading-skeleton"></div>
              ))}
            </div>
          ) : popularProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularProducts.map((product, index) => (
                <div
                  key={product._id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in-up"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Products Available</h3>
              <p className="text-neutral-600 mb-6">
                Products will appear here when the backend is connected.
              </p>
              <Link
                href="/admin"
                className="btn-primary"
              >
                Add Products
              </Link>
            </div>
          )}

          <div className="text-center mt-12 lg:hidden">
            <Link href="/products" className="btn-primary btn-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Gift Section */}
      <GiftSection />

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Stay Updated with Premium Offers
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals,
              exclusive offers, and premium collections.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/30 transition-all duration-300"
              />
              <button
                type="submit"
                className="btn-secondary btn-lg whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
