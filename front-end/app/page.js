'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import CompactProductCard from './components/CompactProductCard';
import PromoCarousel from './components/PromoCarousel';

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch popular products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Try to fetch from backend API
        const response = await fetch('http://localhost:5000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const allProducts = await response.json();
          console.log('Products fetched successfully:', allProducts.length);

          // Select a few products for display
          const selectedProducts = allProducts.slice(0, 6);
          setPopularProducts(selectedProducts);
        } else {
          throw new Error(`API responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch from API, using fallback data:', error);

        // Fallback to mock data if API fails
        const fallbackProducts = [
          {
            _id: '1',
            name: 'Fresh Tomatoes',
            category: 'vegetables',
            price: '80',
            quantityUnit: '1kg',
            image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=500'
          },
          {
            _id: '2',
            name: 'Apples',
            category: 'fruits',
            price: '150',
            quantityUnit: '1kg',
            image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=500'
          },
          {
            _id: '3',
            name: 'Chicken Breast',
            category: 'meat',
            price: '250',
            quantityUnit: '500g',
            image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=500'
          }
        ];
        setPopularProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Quick categories with free image URLs
  const quickCategories = [
    {
      id: 1,
      name: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1557844352-761f2565b576?w=200&h=200&fit=crop&auto=format'
    },
    {
      id: 2,
      name: 'Fruits',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop&auto=format'
    },
    {
      id: 3,
      name: 'Meat',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=200&fit=crop&auto=format'
    }
  ];



  return (
    <div className="min-h-screen pb-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500"></div>
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>

        <div className="relative container-custom py-16 lg:py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 animate-fade-in-up">
              Fresh Groceries
              <span className="block text-gradient-secondary bg-white bg-clip-text text-transparent">
                Delivered Daily
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Premium quality vegetables, fruits, and meat delivered fresh to your doorstep
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up">
              <Link href="/categories" className="btn-secondary btn-lg">
                Shop Now
              </Link>
              <Link href="/about" className="btn-ghost text-white border-white/30 hover:bg-white/10">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in-up">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-white/70">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/70">Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-white/70">Fresh</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Carousel */}
      <section className="container-custom py-8">
        <PromoCarousel />
      </section>

      {/* Categories Section */}
      <section className="container-custom py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover fresh, premium quality products across all your favorite categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quickCategories.map((item, index) => (
            <Link
              href={`/${item.name.toLowerCase()}`}
              key={item.id}
              className="group card-interactive overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    {item.name === 'Vegetables' ? '🥬' :
                     item.name === 'Fruits' ? '🍎' : '🥩'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {item.name === 'Vegetables' ? 'Fresh, organic vegetables daily' :
                   item.name === 'Fruits' ? 'Sweet, juicy seasonal fruits' :
                   'Premium quality meat & poultry'}
                </p>
                <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                  <span>Shop Now</span>
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="container-custom py-12 bg-neutral-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
            Popular Products
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Handpicked favorites loved by our customers
          </p>
          <Link href="/products" className="btn-outline">
            View All Products
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              <p className="text-neutral-600 font-medium">Loading products...</p>
            </div>
          </div>
        ) : popularProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {popularProducts.map((product, index) => (
              <div key={product._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CompactProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">No products available</h3>
            <p className="text-neutral-500">Check back later for amazing products!</p>
          </div>
        )}
      </section>

      {/* Special Offers Banner */}
      <section className="container-custom py-12">
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1200&h=400&fit=crop&auto=format"
            alt="Special Offers"
            width={1200}
            height={400}
            className="w-full h-64 lg:h-80 object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <div className="max-w-lg">
                <h3 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                  Weekend Special
                </h3>
                <p className="text-xl text-white/90 mb-6">
                  Up to 30% off on selected fresh produce and premium items
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/offers" className="btn-secondary">
                    View All Offers
                  </Link>
                  <Link href="/categories" className="btn-ghost text-white border-white/30 hover:bg-white/10">
                    Shop Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
            Why Choose FreshMarket?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We're committed to delivering the freshest products with exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: '💳',
              title: 'Cash on Delivery',
              description: 'Pay only when your order arrives—safe and simple payment method.',
              color: 'success'
            },
            {
              icon: '🚚',
              title: 'Free Delivery',
              description: 'Enjoy fast and completely free delivery on all your orders.',
              color: 'primary'
            },
            {
              icon: '🌱',
              title: 'Fresh & Organic',
              description: 'We provide handpicked, fresh, and organic vegetables daily.',
              color: 'secondary'
            },
            {
              icon: '⭐',
              title: 'Trusted by Locals',
              description: 'Serving happy customers in your neighborhood with quality you can trust.',
              color: 'accent'
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="card text-center p-8 group hover:shadow-large transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-${feature.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get notified about new products, special offers, and fresh arrivals
          </p>

          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl border-0 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20"
            />
            <button
              type="submit"
              className="btn-secondary whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
