'use client'

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    title: 'Fresh & Healthy Vegetables',
    desc: 'Get 20% off on your first vegetable order',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop&auto=format',
    href: '/vegetables',
    gradient: 'from-success-600/90 via-success-500/80 to-success-400/70',
    badge: '20% OFF',
    badgeColor: 'bg-success-500',
    icon: '🥬'
  },
  {
    title: 'Juicy & Sweet Fruits',
    desc: 'Buy seasonal fruits at the best price',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=400&fit=crop&auto=format',
    href: '/fruits',
    gradient: 'from-secondary-600/90 via-secondary-500/80 to-secondary-400/70',
    badge: 'SEASONAL',
    badgeColor: 'bg-secondary-500',
    icon: '🍎'
  },
  {
    title: 'Premium Meat & Poultry',
    desc: 'Delivered hygienically and quickly to your door',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=400&fit=crop&auto=format',
    href: '/meat',
    gradient: 'from-red-600/90 via-red-500/80 to-red-400/70',
    badge: 'PREMIUM',
    badgeColor: 'bg-red-500',
    icon: '🥩'
  },
  {
    title: 'Dairy & Fresh Products',
    desc: 'Farm-fresh dairy products delivered daily',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=400&fit=crop&auto=format',
    href: '/dairy',
    gradient: 'from-primary-600/90 via-primary-500/80 to-primary-400/70',
    badge: 'FRESH',
    badgeColor: 'bg-primary-500',
    icon: '🥛'
  }
];

export default function PromoCarousel() {
    const [index, setIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const intervalRef = useRef(null);

    const nextSlide = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setIndex((prev) => (prev + 1) % banners.length);
      setTimeout(() => setIsTransitioning(false), 500);
    };

    const prevSlide = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setIndex((prev) => (prev - 1 + banners.length) % banners.length);
      setTimeout(() => setIsTransitioning(false), 500);
    };

    const goToSlide = (slideIndex) => {
      if (isTransitioning || slideIndex === index) return;
      setIsTransitioning(true);
      setIndex(slideIndex);
      setTimeout(() => setIsTransitioning(false), 500);
    };

    useEffect(() => {
      if (isAutoPlaying) {
        intervalRef.current = setInterval(nextSlide, 6000);
      } else {
        clearInterval(intervalRef.current);
      }

      return () => clearInterval(intervalRef.current);
    }, [isAutoPlaying]);

    const handleMouseEnter = () => {
      setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
      setIsAutoPlaying(true);
    };

    const handleTouchStart = (e) => {
      touchStartX.current = e.changedTouches[0].screenX;
      setIsAutoPlaying(false);
    };

    const handleTouchEnd = (e) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const distance = touchStartX.current - touchEndX.current;

      if (distance > 50) {
        nextSlide(); // Swipe left
      } else if (distance < -50) {
        prevSlide(); // Swipe right
      }

      setTimeout(() => setIsAutoPlaying(true), 3000);
    };

    const current = banners[index];

  return (
    <div
      ref={carouselRef}
      className="relative w-full h-56 lg:h-64 rounded-3xl overflow-hidden shadow-large group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={current.image}
          alt={current.title}
          fill
          className={`object-cover transition-all duration-700 ${
            isTransitioning ? 'scale-110' : 'scale-100 group-hover:scale-105'
          }`}
          unoptimized
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${current.gradient} transition-opacity duration-700`}></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center p-6 lg:p-8">
        <div className="max-w-lg">
          {/* Badge */}
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{current.icon}</span>
            <span className={`${current.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
              {current.badge}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-white text-2xl lg:text-3xl font-display font-bold mb-3 leading-tight">
            {current.title}
          </h2>

          {/* Description */}
          <p className="text-white/90 text-base lg:text-lg mb-6 leading-relaxed">
            {current.desc}
          </p>

          {/* CTA Button */}
          <Link
            href={current.href}
            className="inline-flex items-center bg-white text-neutral-800 font-semibold py-3 px-6 rounded-2xl hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-medium hover:shadow-large group/btn"
          >
            <span>Shop Now</span>
            <svg className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100 opacity-0 lg:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100 opacity-0 lg:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: isAutoPlaying ? '100%' : '0%',
            transitionDuration: isAutoPlaying ? '6000ms' : '300ms'
          }}
        />
      </div>

      {/* Loading Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
