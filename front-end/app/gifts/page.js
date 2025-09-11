'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    FiGift,
    FiHeart,
    FiStar,
    FiTruck,
    FiClock,
    FiShield,
    FiCheckCircle,
    FiArrowRight,
    FiPackage,
    FiSmile,
    FiCalendar,
    FiEdit3,
    FiArrowLeft
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import GiftSection from '../components/GiftSection';

export default function GiftsPage() {
    const [heroImageLoaded, setHeroImageLoaded] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
            <Navbar />

            {/* Premium Hero Section for Gifts */}
            <section className="relative overflow-hidden min-h-[70vh] flex items-center pt-8 md:pt-0">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary-600 via-secondary-500 to-primary-500"></div>
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary-400/20 rounded-full blur-xl animate-pulse-soft"></div>

                    {/* Grain Texture Overlay */}
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")' }}></div>
                </div>

                <div className="relative container-custom pt-10 pb-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Hero Content */}
                        <div className="text-white space-y-4 md:space-y-6 px-4 md:px-0">
                            <div className="space-y-6 md:space-y-10">
                                <div className="badge-gradient inline-flex items-center space-x-2">
                                    <FiGift className="w-4 h-4" />
                                    <span>Premium Gift Collection 2025</span>
                                </div>

                                <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold leading-tight">
                                    Perfect Gifts
                                    <span className="block text-gradient-secondary">
                                        Every Occasion
                                    </span>
                                    <span className="block text-2xl md:text-3xl lg:text-4xl font-light">Crafted with Love</span>
                                </h1>

                                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-xl leading-relaxed">
                                    Discover our exquisite collection of premium gift packages, thoughtfully curated
                                    with the finest dry fruits and nuts. Perfect for birthdays, celebrations, and special moments.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <Link href="#gift-packages" className="btn-secondary btn-xl group">
                                    <span>Explore Gift Packages</span>
                                    <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                                <Link href="/categories" className="btn-outline text-white border-white/30 hover:bg-white/10 btn-xl">
                                    Custom Gifts
                                </Link>
                            </div>

                            {/* Premium Stats */}
                            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-4 md:pt-6 pb-4 border-t border-white/20">
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold">15+</div>
                                    <div className="text-xs md:text-sm text-white/70">Gift Packages</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold">100%</div>
                                    <div className="text-xs md:text-sm text-white/70">Premium Quality</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold">24h</div>
                                    <div className="text-xs md:text-sm text-white/70">Express Delivery</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative lg:block hidden">
                            <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/LuxuryGift/luxury-gift-set-299.webp"
                                    alt="Premium gift packages collection"
                                    fill
                                    className={`object-cover transition-all duration-1000 ${heroImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                        }`}
                                    onLoad={() => setHeroImageLoaded(true)}
                                    priority
                                />
                                {/* Image overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                                {/* Floating elements */}
                                <div className="absolute top-8 right-8 glass rounded-2xl bg-gradient-to-br from-secondary-600 via-secondary-500 to-primary-500 p-4 animate-float">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-white">Premium Gifts</span>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 left-8 glass bg-gradient-to-br from-secondary-600 via-secondary-500 to-primary-500 rounded-2xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                                    <div className="flex items-center space-x-2">
                                        <FiHeart className="w-4 h-4 text-white" />
                                        <span className="text-sm font-medium text-white">Made with Love</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            {/* <section className="section-padding-sm bg-white">
                <div className="container-custom">
                    <nav className="flex items-center space-x-2 text-sm text-neutral-500">
                        <Link href="/" className="hover:text-primary-600 transition-colors duration-200">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-neutral-900 font-medium">Premium Gifts</span>
                    </nav>
                </div>
            </section> */}

            {/* Main Gift Section */}
            <div id="gift-packages">
                <GiftSection />
            </div>

            {/* Why Choose Our Gifts Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
                            Why Choose Our Gift Packages?
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                            Every gift tells a story. We help you create unforgettable moments
                            with our premium quality and exceptional service.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: FiShield,
                                title: 'Premium Quality Guarantee',
                                description: 'Every product is hand-selected and quality tested to ensure exceptional standards.',
                                color: 'text-primary-600'
                            },
                            {
                                icon: FiPackage,
                                title: 'Beautiful Packaging',
                                description: 'Elegant presentation with premium materials and customizable options.',
                                color: 'text-secondary-600'
                            },
                            {
                                icon: FiHeart,
                                title: 'Personal Touch',
                                description: 'Add personalized messages and custom touches to make your gift special.',
                                color: 'text-accent-600'
                            },
                            {
                                icon: FiTruck,
                                title: 'Express Delivery',
                                description: 'Fast and reliable delivery across UAE with same-day and express options.',
                                color: 'text-success-600'
                            }
                        ].map((feature, index) => (
                            <div
                                key={feature.title}
                                className="text-center group"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 ${feature.color === 'text-primary-600' ? 'bg-primary-100' :
                                        feature.color === 'text-secondary-600' ? 'bg-secondary-100' :
                                            feature.color === 'text-accent-600' ? 'bg-accent-100' :
                                                'bg-success-100'
                                    }`}>
                                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                                </div>
                                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center space-x-2 mb-6">
                            <FiSmile className="w-6 h-6 text-primary-600" />
                            <span className="text-lg font-medium text-primary-700">Ready to Make Someone Happy?</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
                            Start Creating Your Perfect Gift
                        </h2>
                        <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Browse our collection, customize your gift, and spread joy with premium
                            dry fruits and nuts that create lasting memories.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="#gift-packages" className="btn-primary btn-lg group">
                                <span>Browse Gift Packages</span>
                                <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                            <Link href="/categories" className="btn-outline hover:bg-white hover:border-primary-300 btn-lg">
                                Create Custom Gift
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <BottomNav />
        </div>
    );
}