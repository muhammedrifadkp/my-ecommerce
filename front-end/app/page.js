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

  // Fetch popular products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://al-mashhour-api.onrender.com';
        const response = await fetch(`${API_BASE_URL}/api/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const allProducts = await response.json();
          console.log('Products fetched successfully:', allProducts.length);
          const selectedProducts = allProducts.slice(0, 8);
          setPopularProducts(selectedProducts);
        } else {
          throw new Error(`API responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch from API, using fallback data:', error);

        // Enhanced fallback products with more realistic data
        const fallbackProducts = [
          {
            _id: '1',
            name: 'Premium Almonds',
            category: 'nuts',
            price: '45',
            originalPrice: '55',
            quantityUnit: '500g',
            image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500',
            fallbackImage: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=500',
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
            fallbackImage: 'https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=500',
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
            fallbackImage: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500',
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
            fallbackImage: 'https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Premium Turkish pistachios, perfectly roasted and salted'
          },
          {
            _id: '5',
            name: 'Cashew Nuts',
            category: 'nuts',
            price: '55',
            quantityUnit: '350g',
            image: 'https://images.pexels.com/photos/1571774/pexels-photo-1571774.jpeg?auto=compress&cs=tinysrgb&w=500',
            fallbackImage: 'https://images.pexels.com/photos/1571774/pexels-photo-1571774.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Creamy and buttery cashews from Vietnam'
          },
          {
            _id: '6',
            name: 'Premium Walnuts',
            category: 'nuts',
            price: '48',
            quantityUnit: '400g',
            image: 'https://images.pexels.com/photos/1326884/pexels-photo-1326884.jpeg?auto=compress&cs=tinysrgb&w=500',
            fallbackImage: 'https://images.pexels.com/photos/1326884/pexels-photo-1326884.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Fresh California walnuts, rich in omega-3 fatty acids'
          },
          {
            _id: '8',
            name: 'Dried Apricots',
            category: 'dried-fruits',
            price: '35',
            quantityUnit: '250g',
            image: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=500',
            fallbackImage: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=500',
            description: 'Sweet and chewy Turkish apricots, naturally dried'
          }
        ];
        setPopularProducts(fallbackProducts);
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
      <section className="relative overflow-hidden min-h-[90vh] md:min-h-[70vh] flex items-center pt-8 md:pt-0">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-purple-500/20"></div>

          {/* Dynamic Floating Elements */}
          <div className="absolute top-20 right-10 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-pink-400/20 to-red-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-r from-blue-400/15 to-purple-500/15 rounded-full blur-xl animate-pulse-soft"></div>
          <div className="absolute top-10 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }}></div>

          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 40px 40px',
            animation: 'float 8s ease-in-out infinite'
          }}></div>
        </div>

        <div className="relative container-custom pt-4 pb-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Dynamic Hero Content */}
            <div className="text-white space-y-6 px-4 md:px-0">
              <div className="space-y-7">
                {/* Enhanced Logo Section */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-white-400 via-white-500 to-white-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/30">
                      <div className="w-64 h-20 md:w-72 md:h-24 relative">
                        <Image
                          src="/logo-and-name.png"
                          alt="Al Mashhour - Premium Dry Fruits & Nuts"
                          fill
                          className="object-contain drop-shadow-2xl"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exciting Typography with Animations */}
                <div className="space-y-5">
                  <div className="relative">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold leading-tight animate-fade-in-up">
                      <span className="block text-white drop-shadow-2xl animate-slide-right">Discover</span>
                      <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl animate-slide-left" style={{ animationDelay: '0.3s' }}>
                        Premium Luxury
                      </span>
                      <span className="block text-xl md:text-2xl lg:text-4xl font-light text-white/95 animate-fade-in" style={{ animationDelay: '0.6s' }}>Dry Fruits & Exotic Nuts</span>
                    </h1>

                    {/* Floating decorative elements */}
                    {/* <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80"></div> */}
                    {/* <div className="absolute top-1/2 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-60"></div> */}
                  </div>

                  {/* Interactive Features Grid */}
                  {/* <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="group flex items-center space-x-3 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg">✨</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">Premium Quality</div>
                          <div className="text-xs text-white/80">Hand-selected</div>
                        </div>
                      </div>
                      <div className="group flex items-center space-x-3 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg">🚀</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">Fast Delivery</div>
                          <div className="text-xs text-white/80">24h Dubai</div>
                        </div>
                      </div>
                      <div className="group flex items-center space-x-3 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg">🎁</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">Gift Packaging</div>
                          <div className="text-xs text-white/80">Luxury boxes</div>
                        </div>
                      </div>
                      <div className="group flex items-center space-x-3 p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg">🏆</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">100% Natural</div>
                          <div className="text-xs text-white/80">Pure & fresh</div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Dynamic Action Buttons */}
                <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                  <Link href="/categories" className="group relative w-full flex items-center justify-center overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transform group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/80 via-orange-500/80 to-red-500/80 animate-pulse"></div>
                    <div className="relative px-8 py-4 text-white font-bold text-lg flex items-center space-x-3">
                      <span>🎆 Explore Amazing Collection</span>
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </Link>

                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/products" className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 text-center text-sm">
                      <span className="group-hover:scale-110 inline-block transition-transform duration-300">🛒 All Products</span>
                    </Link>
                    <Link href="/gifts" className="group bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 text-center text-sm">
                      <span className="group-hover:scale-110 inline-block transition-transform duration-300">🎁 Gift Sets</span>
                    </Link>
                  </div>
                </div>

                {/* Interactive Stats Section */}
                <div className="bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/30 shadow-2xl animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
                  <div className="text-center mb-5">
                    <h3 className="text-xl font-display font-bold text-white mb-2 flex items-center justify-center space-x-2">
                      {/* <span>🌟</span> */}
                      <span>Why Choose Al Mashhour?</span>
                      {/* <span>🌟</span> */}
                    </h3>
                    <p className="text-sm text-white/90">Your premium destination for luxury dry fruits & nuts</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="group text-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                      <div className="text-1xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50+</div>
                      <div className="text-xs text-white/90 font-medium">Premium Varieties</div>
                    </div>
                    <div className="group text-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer border-l border-r border-white/20">
                      <div className="text-1xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">100%</div>
                      <div className="text-xs text-white/90 font-medium">Natural & Pure</div>
                    </div>
                    <div className="group text-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                      <div className="text-1xl font-bold bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24h</div>
                      <div className="text-xs text-white/90 font-medium">Fast Delivery</div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex justify-center space-x-8 pt-4 border-t border-white/20">
                    <div className="group flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-300">
                      <FiShield className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Quality Guaranteed</span>
                    </div>
                    <div className="group flex items-center space-x-2 text-sm text-white/90 hover:text-white transition-colors duration-300">
                      <FiStar className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>5★ Rated</span>
                    </div>
                  </div>
                </div>

                {/* Animated Visual Elements */}
                <div className="flex justify-center space-x-6 pt-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>

            {/* Spectacular Mobile Hero Image */}
            <div className="relative lg:block">
              {/* Mobile Interactive Visual */}
              <div className="lg:hidden relative w-full h-72 rounded-3xl overflow-hidden shadow-2xl mb-6 animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-orange-500/30 to-red-500/30 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-6 p-6">
                    <div className="group bg-white/20 backdrop-blur-md rounded-3xl p-5 transform rotate-6 hover:rotate-12 transition-all duration-500 cursor-pointer hover:scale-110">
                      <div className="text-4xl text-center animate-bounce">🥜</div>
                      <div className="text-xs text-white/95 text-center mt-3 font-bold">Premium Nuts</div>
                      <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mt-2 group-hover:h-2 transition-all duration-300"></div>
                    </div>
                    <div className="group bg-white/20 backdrop-blur-md rounded-3xl p-5 transform -rotate-3 hover:-rotate-9 transition-all duration-500 cursor-pointer hover:scale-110">
                      <div className="text-4xl text-center animate-bounce" style={{ animationDelay: '0.2s' }}>🍇</div>
                      <div className="text-xs text-white/95 text-center mt-3 font-bold">Dry Fruits</div>
                      <div className="w-full h-1 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mt-2 group-hover:h-2 transition-all duration-300"></div>
                    </div>
                    <div className="group bg-white/20 backdrop-blur-md rounded-3xl p-5 transform rotate-2 hover:rotate-6 transition-all duration-500 cursor-pointer hover:scale-110">
                      <div className="text-4xl text-center animate-bounce" style={{ animationDelay: '0.4s' }}>🌴</div>
                      <div className="text-xs text-white/95 text-center mt-3 font-bold">Exotic Dates</div>
                      <div className="w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-2 group-hover:h-2 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Dynamic floating badges */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-4 py-2 rounded-full font-bold animate-pulse shadow-lg">
                  ✨ Fresh Daily
                </div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-4 py-2 rounded-full font-bold animate-bounce shadow-lg">
                  🎆 Premium Quality
                </div>
                
              </div>

              {/* Desktop Hero Image */}
              <div className="hidden lg:block relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl">
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
      <section className="section-padding-sm bg-white pt-4">
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
                Our customers' favorite premium selections, loved for their exceptional
                quality and exquisite taste.
              </p>
            </div>
            <Link
              href="/products"
              className="btn-outline hover:bg-primary-50 hover:border-primary-300 hidden lg:flex items-center space-x-2"
            >
              <span>View All</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card h-96 loading-skeleton"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                suppressHydrationWarning
              />
              <button
                type="submit"
                className="btn-secondary btn-lg whitespace-nowrap"
                suppressHydrationWarning
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
