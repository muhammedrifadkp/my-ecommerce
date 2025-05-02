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

  // Fetch popular products from backend - one from each category
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const allProducts = await response.json();

        // Categorize products
        const vegetables = allProducts.filter(product => product.category?.toLowerCase() === 'vegetables');
        const fruits = allProducts.filter(product => product.category?.toLowerCase() === 'fruits');
        const meat = allProducts.filter(product => product.category?.toLowerCase() === 'meat');

        // Pick one random product from each category
        const randomVegetable = vegetables.length > 0 ? vegetables[Math.floor(Math.random() * vegetables.length)] : null;
        const randomFruit = fruits.length > 0 ? fruits[Math.floor(Math.random() * fruits.length)] : null;
        const randomMeat = meat.length > 0 ? meat[Math.floor(Math.random() * meat.length)] : null;

        // Filter out the selected ones from the main list
        const selectedIds = [randomVegetable, randomFruit, randomMeat].filter(Boolean).map(p => p._id);
        const remainingProducts = allProducts.filter(p => !selectedIds.includes(p._id));

        // Pick 3 more random products
        const extraProducts = [...remainingProducts]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        // Combine and shuffle all selected products
        const finalList = [...[randomVegetable, randomFruit, randomMeat].filter(Boolean), ...extraProducts]
          .sort(() => 0.5 - Math.random());

        setPopularProducts(finalList);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
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
    <div className="bg-white min-h-screen pb-16">
      <Navbar />

      {/* Promo Banner */}
      <section className="p-4">
        <PromoCarousel />
      </section>


      {/* Categories */}
      <section className="mb-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Categories</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 px-4">
          {quickCategories.map((item) => (
            <Link
              href={`/${item.name.toLowerCase()}`}
              key={item.id}
              className={`flex flex-col items-center p-4 hover:scale-105 transition-transform rounded-lg
                ${item.name === 'Vegetables' ? 'bg-green-50' :
                  item.name === 'Fruits' ? 'bg-orange-50' :
                  'bg-red-50'}`}
            >
              <div className={`w-20 h-20 bg-white rounded-full mb-3 shadow-md overflow-hidden border-2
                ${item.name === 'Vegetables' ? 'border-green-200' :
                  item.name === 'Fruits' ? 'border-orange-200' :
                  'border-red-200'}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <p className="font-medium text-sm mt-1">{item.name}</p>
              {item.name === 'Vegetables' && (
                <span className="text-xs text-green-600"></span>
              )}
              {item.name === 'Fruits' && (
                <span className="text-xs text-orange-500"></span>
              )}
              {item.name === 'Meat' && (
                <span className="text-xs text-red-500"></span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products - One from each category */}
      <section className="px-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Popular Products</h2>
          <Link href="/products" className="text-green-600 text-sm">See All</Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : popularProducts.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {popularProducts.map((product) => (
              <CompactProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No products available
          </div>
        )}
      </section>

      {/* Best Offers Banner */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Special Offers</h2>
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&h=300&fit=crop&auto=format"
            alt="Best Offers"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-6">
            <h3 className="text-white text-lg font-bold mb-1">Weekend Special</h3>
            <p className="text-white text-sm mb-2">Up to 30% off on selected items</p>
            <Link href="/offers" className="bg-white text-green-600 text-xs py-1 px-3 rounded-full w-fit">
              View Offers
            </Link>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
<section className="px-4 mb-6">
  <h2 className="text-lg font-semibold mb-4">Why Shop With Us</h2>
  <div className="grid grid-cols-2 gap-4 text-sm">
    <div className="bg-green-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-1">Cash on Delivery</h3>
      <p>Pay only when your order arrives—safe and simple payment method.</p>
    </div>
    <div className="bg-orange-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-1">Free Delivery</h3>
      <p>Enjoy fast and completely free delivery on all your orders.</p>
    </div>
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-1">Fresh & Organic</h3>
      <p>We provide handpicked, fresh, and organic vegetables daily.</p>
    </div>
    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-1">Trusted by Locals</h3>
      <p>Serving happy customers in your neighborhood with quality you can trust.</p>
    </div>
  </div>
</section>


      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}
