'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CompactProductCard from '../components/CompactProductCard';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://my-ecommerce-production-11b0.up.railway.app'}/api/products`);

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

  return (
    <div className="bg-white min-h-screen pb-16">
      <Navbar />

      {/* Header */}
      <header className="bg-green-600 px-4 py-4 text-white">
        <div className="flex items-center">
          <Link href="/" className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold capitalize">{category}</h1>
        </div>
      </header>

      {/* Products Grid */}
      <section className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map(product => (
              <CompactProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">No products found in this category.</p>
            <Link href="/" className="text-green-600 hover:text-green-800">
              Browse other categories
            </Link>
          </div>
        )}
      </section>

      <BottomNav />
    </div>
  );
}