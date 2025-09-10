'use client'

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: 'Premium Dry Fruits',
    subtitle: 'Nature\'s Finest Selection',
    description: 'Hand-picked premium dried fruits from the world\'s best orchards',
    image: '/banners/Premium-Dry-Fruits.jpg',
    fallbackImage: '/banners/Premium-Dry-Fruits.jpg',
    href: '/premium-dry-fruits',
    gradient: 'from-purple-600/90 via-purple-500/80 to-pink-500/70',
    badge: 'PREMIUM',
    badgeColor: 'bg-purple-600',
    textColor: 'text-white',
    icon: '🍇',
    cta: 'Shop Premium Collection'
  },
  {
    id: 2,
    title: 'Luxury Nuts & Seeds',
    subtitle: 'Artisan Quality',
    description: 'Carefully selected nuts and seeds for health-conscious connoisseurs',
    image: '/banners/Luxury-Nuts-Seeds.jpg',
    fallbackImage: '/banners/Luxury-Nuts-Seeds.jpg',
    href: '/nuts-seeds',
    gradient: 'from-amber-600/90 via-orange-500/80 to-yellow-500/70',
    badge: 'LUXURY',
    badgeColor: 'bg-amber-600',
    textColor: 'text-white',
    icon: '🥜',
    cta: 'Explore Luxury Range'
  },
  {
    id: 3,
    title: 'Exotic Dates Collection',
    subtitle: 'Royal Heritage',
    description: 'Rare Medjool dates and exotic delicacies from ancient groves',
    image: '/banners/Exotic-Dates-Collection.webp',
    fallbackImage: '/banners/Dates-Collection.webp',
    href: '/dates-exotic',
    gradient: 'from-amber-800/90 via-brown-600/80 to-orange-700/70',
    badge: 'EXOTIC',
    badgeColor: 'bg-amber-800',
    textColor: 'text-white',
    icon: '🌴',
    cta: 'Discover Exotic Taste'
  },
];

export default function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying]);

  // Navigation functions
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Image error handling
  const handleImageError = (bannerId) => {
    setImageErrors(prev => ({ ...prev, [bannerId]: true }));
  };

  const handleImageLoad = (bannerId) => {
    setImagesLoaded(prev => ({ ...prev, [bannerId]: true }));
  };

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full">
      {/* Main Carousel Container */}
      <div
        ref={carouselRef}
        className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images with Smooth Transitions */}
        <div className="absolute inset-0">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                <Image
                  src={imageErrors[banner.id] ? banner.fallbackImage : banner.image}
                  alt={banner.title}
                  fill
                  className={`object-cover transition-all duration-1000 ${imagesLoaded[banner.id] ? 'opacity-100' : 'opacity-0'
                    } ${index === currentIndex ? 'scale-100' : 'scale-110'
                    }`}
                  onLoad={() => handleImageLoad(banner.id)}
                  onError={() => handleImageError(banner.id)}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />

                {/* Image Loading Skeleton */}
                {!imagesLoaded[banner.id] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse" />
                )}
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} transition-opacity duration-700`} />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="flex items-center mb-4 animate-fade-in">
                <span className="text-3xl md:text-4xl mr-3">{currentBanner.icon}</span>
                <span className={`${currentBanner.badgeColor} ${currentBanner.textColor} text-xs md:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg`}>
                  {currentBanner.badge}
                </span>
              </div>

              {/* Title */}
              <h2 className={`${currentBanner.textColor} text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight animate-slide-up`}>
                {currentBanner.title}
              </h2>

              {/* Subtitle */}
              <h3 className={`${currentBanner.textColor.replace('text-white', 'text-white/90')} text-lg md:text-xl lg:text-2xl font-medium mb-4 animate-slide-up`} style={{ animationDelay: '0.1s' }}>
                {currentBanner.subtitle}
              </h3>

              {/* Description */}
              <p className={`${currentBanner.textColor.replace('text-white', 'text-white/80')} text-base md:text-lg mb-6 leading-relaxed animate-slide-up`} style={{ animationDelay: '0.2s' }}>
                {currentBanner.description}
              </p>

              {/* CTA Button */}
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Link
                  href={currentBanner.href}
                  className="inline-flex items-center bg-white text-neutral-900 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-neutral-100 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl group/btn transform hover:-translate-y-1"
                >
                  <span className="mr-3">{currentBanner.cta}</span>
                  <svg
                    className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute top-1/2 right-4 md:right-6 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-3">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? 'w-8 md:w-10 h-3 md:h-4 bg-white shadow-lg'
                    : 'w-3 md:w-4 h-3 md:h-4 bg-white/50 hover:bg-white/70'
                  } disabled:cursor-not-allowed`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 md:px-4 py-1 md:py-2">
            <span className="text-white text-sm md:text-base font-medium">
              {currentIndex + 1} / {banners.length}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation (Desktop Only) */}
      <div className="hidden lg:flex justify-center mt-6 space-x-4">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`relative w-20 h-12 rounded-lg overflow-hidden transition-all duration-300 ${index === currentIndex
                ? 'ring-4 ring-primary-500 shadow-lg scale-105'
                : 'hover:scale-105 opacity-70 hover:opacity-100'
              } disabled:cursor-not-allowed`}
          >
            <Image
              src={imageErrors[banner.id] ? banner.fallbackImage : banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              sizes="80px"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-60`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg">{banner.icon}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
