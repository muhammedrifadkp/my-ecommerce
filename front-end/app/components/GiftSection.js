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
    FiEdit3
} from 'react-icons/fi';
import GiftPackagePopup from './GiftPackagePopup';

export default function GiftSection() {
    const [selectedGift, setSelectedGift] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Premium gift packages data
    const giftPackages = [
        {
            id: 1,
            name: 'Luxury Premium Collection',
            description: 'An exquisite selection of our finest dry fruits and nuts in premium packaging',
            price: 299,
            originalPrice: 349,
            image: '/LuxuryGift/luxury-gift-set-299.webp',
            fallbackImage: '/LuxuryGift/luxury-gift-set-299.webp',
            category: 'Premium',
            badge: 'BESTSELLER',
            badgeColor: 'bg-secondary-500',
            gradient: 'from-amber-600/90 via-amber-500/80 to-amber-400/70',
            icon: '🎁',
            contents: [
                'Premium Almonds (200g)',
                'Turkish Pistachios (150g)',
                'Medjool Dates (200g)',
                'Mixed Dried Fruits (150g)',
                'Cashew Nuts (150g)',
                'Walnuts (150g)'
            ],
            features: [
                'Elegant wooden gift box',
                'Personalized message card',
                'Premium ribbon wrapping',
                'Care instructions included'
            ],
            occasions: ['Birthday', 'Anniversary', 'Corporate Gifts', 'Eid'],
            deliveryTime: '24 hours in Dubai',
            rating: 4.9,
            reviews: 128
        },
        {
            id: 2,
            name: 'Royal Family Hamper',
            description: 'Perfect for family celebrations with generous portions of premium selections',
            price: 199,
            originalPrice: 239,
            image: '/LuxuryGift/Luxury-Gift-dry-fruits-199.jpg',
            fallbackImage: '/LuxuryGift/Luxury-Gift-dry-fruits-199.jpg',
            category: 'Family',
            badge: 'POPULAR',
            badgeColor: 'bg-primary-500',
            gradient: 'from-primary-600/90 via-primary-500/80 to-primary-400/70',
            icon: '👑',
            contents: [
                'Mixed Nuts Assortment (300g)',
                'Dried Fruits Mix (250g)',
                'Premium Dates (250g)',
                'Honey Roasted Cashews (200g)',
                'Turkish Delights (150g)'
            ],
            features: [
                'Large decorative basket',
                'Family greeting card',
                'Golden ribbon finish',
                'Sharing guide included'
            ],
            occasions: ['Family Gatherings', 'Holidays', 'Ramadan', 'Celebrations'],
            deliveryTime: '24-48 hours',
            rating: 4.8,
            reviews: 95
        },
        {
            id: 3,
            name: 'Executive Business Gift',
            description: 'Sophisticated gift perfect for corporate occasions and business relationships',
            price: 149,
            originalPrice: 179,
            image: '/LuxuryGift/Luxury-dry-Gift-149.jpg',
            fallbackImage: '/LuxuryGift/Luxury-dry-Gift-149.jpg',
            category: 'Corporate',
            badge: 'PROFESSIONAL',
            badgeColor: 'bg-accent-500',
            gradient: 'from-accent-600/90 via-accent-500/80 to-accent-400/70',
            icon: '💼',
            contents: [
                'Premium Almonds (150g)',
                'Roasted Pistachios (150g)',
                'Dried Apricots (100g)',
                'Mixed Nuts (150g)',
                'Gourmet Dates (100g)'
            ],
            features: [
                'Sleek black gift box',
                'Corporate message card',
                'Minimalist design',
                'Company branding option'
            ],
            occasions: ['Business Meetings', 'Client Appreciation', 'Employee Recognition', 'Conferences'],
            deliveryTime: '24 hours',
            rating: 4.7,
            reviews: 67
        },
        {
            id: 4,
            name: 'Special Occasion Box',
            description: 'Customizable gift box perfect for any special celebration or milestone',
            price: 99,
            originalPrice: 119,
            image: '/LuxuryGift/Luxury-Gift-99.jpeg',
            fallbackImage: '/LuxuryGift/Luxury-Gift-99.jpeg',
            category: 'Occasions',
            badge: 'CUSTOMIZABLE',
            badgeColor: 'bg-success-500',
            gradient: 'from-success-600/90 via-success-500/80 to-success-400/70',
            icon: '🌟',
            contents: [
                'Choose 3 premium items',
                'Custom message card',
                'Personalized packaging',
                'Gift wrapping included'
            ],
            features: [
                'Fully customizable contents',
                'Multiple box sizes',
                'Color theme options',
                'Express delivery available'
            ],
            occasions: ['Weddings', 'Baby Shower', 'Graduation', 'Thank You'],
            deliveryTime: '2-3 days',
            rating: 4.6,
            reviews: 84
        }
    ];

    // Customer testimonials
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Ahmed',
            location: 'Dubai, UAE',
            rating: 5,
            text: 'The Luxury Premium Collection was absolutely perfect for my mother\'s birthday. The packaging was stunning and the quality exceeded expectations. Will definitely order again!',
            gift: 'Luxury Premium Collection',
            avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        {
            id: 2,
            name: 'Mohammed Al-Rashid',
            location: 'Abu Dhabi, UAE',
            rating: 5,
            text: 'Ordered the Royal Family Hamper for Eid celebrations. Our entire family loved the variety and freshness. The delivery was super quick too!',
            gift: 'Royal Family Hamper',
            avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        {
            id: 3,
            name: 'Priya Sharma',
            location: 'Sharjah, UAE',
            rating: 5,
            text: 'Used the Executive Business Gift for client appreciation. Professional packaging and excellent quality made a great impression. Highly recommended!',
            gift: 'Executive Business Gift',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
    ];

    // Delivery options
    const deliveryOptions = [
        {
            icon: FiTruck,
            title: 'Express Delivery',
            description: '24 hours in Dubai & Abu Dhabi',
            price: 'FREE',
            highlight: true
        },
        {
            icon: FiClock,
            title: 'Same Day Delivery',
            description: 'Order before 2 PM',
            price: 'AED 25',
            highlight: false
        },
        {
            icon: FiCalendar,
            title: 'Scheduled Delivery',
            description: 'Choose your preferred date',
            price: 'AED 15',
            highlight: false
        },
        {
            icon: FiGift,
            title: 'Gift Wrapping',
            description: 'Premium wrapping service',
            price: 'AED 20',
            highlight: false
        }
    ];

    // Special offers
    const specialOffers = [
        {
            title: 'Buy 2 Get 1 Free',
            description: 'On selected gift packages',
            code: 'GIFT3FOR2',
            color: 'from-secondary-500 to-secondary-600',
            icon: '🎊'
        },
        {
            title: '20% Off Corporate Orders',
            description: 'Orders above AED 500',
            code: 'CORP20',
            color: 'from-accent-500 to-accent-600',
            icon: '💼'
        },
        {
            title: 'Free Personalization',
            description: 'Custom messages & cards',
            code: 'PERSONAL',
            color: 'from-primary-500 to-primary-600',
            icon: '✨'
        }
    ];

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const handleGiftSelect = (giftPackage) => {
        setSelectedGift(giftPackage);
        setShowPopup(true);
    };

    return (
        <section className="section-padding bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-secondary-200/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container-custom relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="badge-primary inline-flex items-center space-x-2 mb-4">
                        <FiGift className="w-4 h-4" />
                        <span>Premium Gift Collection</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-display font-bold text-neutral-900 mb-6">
                        Luxury Gift Packages
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Create memorable moments with our beautifully curated gift packages.
                        Perfect for any occasion, crafted with premium ingredients and elegant presentation.
                    </p>
                </div>

                {/* Gift Packages Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {giftPackages.map((giftPackage, index) => (
                        <div
                            key={giftPackage.id}
                            className="group relative overflow-hidden rounded-3xl card-hover bg-white shadow-soft"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Package Badge */}
                            <div className="absolute top-4 left-4 z-10">
                                <div className={`${giftPackage.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                                    {giftPackage.badge}
                                </div>
                            </div>

                            {/* Price Badge */}
                            {giftPackage.originalPrice > giftPackage.price && (
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="bg-error-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        SAVE {Math.round(((giftPackage.originalPrice - giftPackage.price) / giftPackage.originalPrice) * 100)}%
                                    </div>
                                </div>
                            )}

                            {/* Package Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={giftPackage.image}
                                    alt={giftPackage.name}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110"
                                    priority={index < 2}
                                />

                                {/* Fallback Pattern */}
                                <div className="fallback-pattern hidden absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 items-center justify-center">
                                    <div className="text-center text-primary-600">
                                        <div className="text-6xl mb-3">{giftPackage.icon}</div>
                                        <span className="text-sm font-medium">{giftPackage.category}</span>
                                        <div className="text-xs text-primary-500 mt-1">Premium Gift</div>
                                    </div>
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-t ${giftPackage.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>

                                {/* Package Icon */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center">
                                        <span className="text-3xl">{giftPackage.icon}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Package Information */}
                            <div className="p-6">
                                {/* Category and Rating */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="badge-secondary text-xs">
                                        {giftPackage.category.toUpperCase()}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium text-neutral-600">
                                            {giftPackage.rating}
                                        </span>
                                        <span className="text-xs text-neutral-400">({giftPackage.reviews})</span>
                                    </div>
                                </div>

                                {/* Package Name */}
                                <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                                    {giftPackage.name}
                                </h3>

                                {/* Package Description */}
                                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                                    {giftPackage.description}
                                </p>

                                {/* Key Features */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {giftPackage.features.slice(0, 2).map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center px-2 py-1 rounded-lg bg-success-50 text-success-700 text-xs font-medium"
                                        >
                                            <FiCheckCircle className="w-3 h-3 mr-1" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Delivery Time */}
                                <div className="flex items-center text-sm text-neutral-500 mb-4">
                                    <FiTruck className="w-4 h-4 mr-2" />
                                    <span>{giftPackage.deliveryTime}</span>
                                </div>

                                {/* Price and Actions */}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline space-x-2">
                                            <span className="text-2xl font-bold text-primary-700">
                                                AED {giftPackage.price}
                                            </span>
                                        </div>
                                        {giftPackage.originalPrice && giftPackage.originalPrice > giftPackage.price && (
                                            <span className="text-sm text-neutral-400 line-through">
                                                AED {giftPackage.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleGiftSelect(giftPackage)}
                                        className="btn-primary interactive flex items-center space-x-2"
                                        aria-label={`Customize ${giftPackage.name}`}
                                        suppressHydrationWarning
                                    >
                                        <FiEdit3 className="w-4 h-4" />
                                        <span>Customize</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Special Offers */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {specialOffers.map((offer, index) => (
                        <div
                            key={offer.title}
                            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${offer.color} p-6 text-white card-hover`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute top-2 right-2 text-4xl opacity-20">
                                {offer.icon}
                            </div>
                            <div className="relative">
                                <h3 className="text-lg font-bold mb-2">{offer.title}</h3>
                                <p className="text-white/90 text-sm mb-3">{offer.description}</p>
                                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                                    <span className="text-xs font-medium">Code:</span>
                                    <span className="text-sm font-bold">{offer.code}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Delivery Options */}
                <div className="bg-white rounded-3xl shadow-soft p-8 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                            Flexible Delivery Options
                        </h3>
                        <p className="text-lg text-neutral-600">
                            Choose the delivery option that works best for you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deliveryOptions.map((option, index) => (
                            <div
                                key={option.title}
                                className={`text-center p-6 rounded-2xl transition-all duration-300 ${option.highlight
                                    ? 'bg-gradient-primary text-white shadow-colored-primary'
                                    : 'bg-neutral-50 hover:bg-neutral-100'
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 ${option.highlight ? 'bg-white/20' : 'bg-primary-100'
                                    }`}>
                                    <option.icon className={`w-6 h-6 ${option.highlight ? 'text-white' : 'text-primary-600'}`} />
                                </div>
                                <h4 className={`font-semibold mb-2 ${option.highlight ? 'text-white' : 'text-neutral-900'}`}>
                                    {option.title}
                                </h4>
                                <p className={`text-sm mb-3 ${option.highlight ? 'text-white/90' : 'text-neutral-600'}`}>
                                    {option.description}
                                </p>
                                <div className={`font-bold ${option.highlight ? 'text-white' : 'text-primary-700'}`}>
                                    {option.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Customer Testimonials */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 mb-16">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                            What Our Customers Say
                        </h3>
                        <p className="text-lg text-neutral-600">
                            Real experiences from our valued gift recipients
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`transition-all duration-500 ${index === activeTestimonial
                                        ? 'opacity-100 transform translate-x-0'
                                        : 'opacity-0 absolute inset-0 transform translate-x-4'
                                        }`}
                                >
                                    <div className="bg-white rounded-2xl p-8 shadow-soft">
                                        <div className="flex items-center mb-6">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                                                <p className="text-sm text-neutral-500">{testimonial.location}</p>
                                                <div className="flex items-center mt-1">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="badge-secondary text-xs mb-1">VERIFIED PURCHASE</div>
                                                <p className="text-xs text-neutral-500">{testimonial.gift}</p>
                                            </div>
                                        </div>
                                        <p className="text-neutral-700 leading-relaxed italic">
                                            "{testimonial.text}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Testimonial Navigation */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial
                                        ? 'bg-primary-500 scale-125'
                                        : 'bg-neutral-300 hover:bg-neutral-400'
                                        }`}
                                    suppressHydrationWarning
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-gradient-primary rounded-3xl p-12 text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-grain-texture opacity-30"></div>
                        <div className="relative">
                            <div className="inline-flex items-center space-x-2 mb-4">
                                <FiHeart className="w-6 h-6" />
                                <span className="text-lg font-medium">Spread Joy with Premium Gifts</span>
                            </div>
                            <h3 className="text-4xl font-display font-bold mb-6">
                                Create Your Perfect Gift Today
                            </h3>
                            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                Every gift tells a story. Let us help you create beautiful memories
                                with our premium collection of dry fruits and nuts.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/categories" className="btn-secondary btn-lg group">
                                    <span>Browse All Gifts</span>
                                    <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                                <Link href="/contact" className="btn-outline text-white border-white/30 hover:bg-white/10 btn-lg">
                                    Need Help Choosing?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gift Package Popup */}
            {showPopup && selectedGift && (
                <GiftPackagePopup
                    giftPackage={selectedGift}
                    onClose={() => {
                        setShowPopup(false);
                        setSelectedGift(null);
                    }}
                />
            )}
        </section>
    );
}