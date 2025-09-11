'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://al-mashhour-api.onrender.com'}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();

        const uniqueCategories = [...new Set(products.map(p => p.category))];
        const categoryObjects = uniqueCategories.map(category => {
          const product = products.find(p => p.category === category);
          return {
            _id: category,
            name: category,
            image: product?.image || '/images/products/placeholder.jpg', // REPLACE: Add your product placeholder image here
          };
        });

        setCategories(categoryObjects);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-20">
      {/* Navbar */}
      <Navbar />
      {/* Page Header */}
      <header className="bg-gradient-primary px-4 py-6 text-white shadow-xl sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex items-center space-x-4">
            <Link href="/" className="p-2 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-display font-bold tracking-tight text-shadow-sm">All Categories</h1>
          </div>
        </div>
      </header>


      {/* Content */}
      <main className="container-custom section-padding">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="loading-spinner h-12 w-12 mb-4"></div>
            <p className="text-neutral-600 font-medium">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center mt-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-display font-semibold text-neutral-800 mb-2">No Categories Found</h3>
              <p className="text-neutral-600">We couldn't find any categories at the moment. Please try again later.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
                Explore Our Collections
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Discover our carefully curated categories of premium products
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/${category.name.toLowerCase()}`}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-neutral-200/50 hover:border-primary-300/50"
                >
                  {/* Card Inner Container */}
                  <div className="relative">
                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        unoptimized
                      />
                      {/* Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Luxury Badge */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5">
                          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Floating Title on Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-display font-bold text-neutral-900 text-center capitalize truncate text-sm group-hover:text-primary-600 transition-colors duration-300">
                            {category.name}
                          </h3>
                          <div className="flex justify-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content Footer */}
                    <div className="p-4 bg-gradient-to-r from-accent-50 to-accent-100">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-neutral-600 font-medium uppercase tracking-wider">
                          Explore
                        </div>
                        <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300">
                          <svg className="w-3 h-3 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-3xl shadow-glow"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
