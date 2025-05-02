'use client'

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    title: 'Fresh & Healthy',
    desc: 'Get 20% off on your first vegetable order',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop&auto=format',
    href: '/vegetables',
    bgFrom: 'from-green-600/70',
  },
  {
    title: 'Juicy & Sweet Fruits',
    desc: 'Buy seasonal fruits at the best price',
    image: 'https://c8.alamy.com/comp/EJHTF7/fruit-and-vegetable-shop-paris-france-EJHTF7.jpg',
    href: '/fruits',
    bgFrom: 'from-yellow-600/70',
  },
  {
    title: 'Fresh Meat & Poultry',
    desc: 'Delivered hygienically and quickly to your door',
    image: 'https://img.freepik.com/premium-photo/meat-products-butchers-shop_967812-7606.jpg',
    href: '/meat',
    bgFrom: 'from-red-600/70',
  }
];

export default function PromoCarousel() {
    const [index, setIndex] = useState(0);
    const carouselRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
  
    const nextSlide = () => {
      setIndex((prev) => (prev + 1) % banners.length);
    };
  
    const prevSlide = () => {
      setIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };
  
    useEffect(() => {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }, []);
  
    const handleTouchStart = (e) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };
  
    const handleTouchEnd = (e) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const distance = touchStartX.current - touchEndX.current;
  
      if (distance > 50) {
        nextSlide(); // Swipe left
      } else if (distance < -50) {
        prevSlide(); // Swipe right
      }
    };
  
    const current = banners[index];

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-40 rounded-lg overflow-hidden transition-all duration-500"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={current.image}
        alt={current.title}
        fill
        className="object-cover transition-opacity duration-500"
        unoptimized
      />

      <div className={`absolute inset-0 bg-gradient-to-r ${current.bgFrom} to-transparent flex flex-col justify-center p-6`}>
        <h2 className="text-white text-xl font-bold mb-2">{current.title}</h2>
        <p className="text-white text-sm mb-3">{current.desc}</p>
        <Link href={current.href} className="bg-white text-sm text-gray-800 py-1 px-4 rounded-full w-fit">
          Shop Now
        </Link>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  );
}
