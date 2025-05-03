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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://my-ecommerce-production-11b0.up.railway.app'}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const products = await response.json();

        const uniqueCategories = [...new Set(products.map(p => p.category))];
        const categoryObjects = uniqueCategories.map(category => {
          const product = products.find(p => p.category === category);
          return {
            _id: category,
            name: category,
            image: product?.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&auto=format',
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
    <div className="bg-white min-h-screen pb-20">
      {/* Navbar */}
      <Navbar />
      {/* Page Header */}
      <header className="bg-green-600 px-4 py-4 text-white shadow-md sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/" className="p-1 rounded-full hover:bg-green-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold tracking-wide">All Categories</h1>
        </div>
      </header>


      {/* Content */}
      <main className="px-4 pt-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-500 mt-16">No categories found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/${category.name.toLowerCase()}`}
                className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-gray-50"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="text-white font-semibold text-sm p-3 capitalize truncate w-full">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
