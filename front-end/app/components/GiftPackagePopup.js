'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    FiX,
    FiGift,
    FiHeart,
    FiStar,
    FiTruck,
    FiCalendar,
    FiUser,
    FiMail,
    FiPhone,
    FiMapPin,
    FiCreditCard,
    FiShoppingCart,
    FiEdit3,
    FiPackage,
    FiCheckCircle,
    FiClock,
    FiSmile
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function GiftPackagePopup({ giftPackage, onClose }) {
    const [step, setStep] = useState(1);
    const [customization, setCustomization] = useState({
        message: '',
        senderName: '',
        recipientName: '',
        occasion: '',
        deliveryDate: '',
        packaging: 'premium',
        ribbon: 'gold',
        cardDesign: 'elegant'
    });
    const [selectedContents, setSelectedContents] = useState([...giftPackage.contents]);
    const [deliveryInfo, setDeliveryInfo] = useState({
        recipientPhone: '',
        recipientEmail: '',
        address: '',
        city: 'Dubai',
        deliveryTime: 'anytime',
        specialInstructions: ''
    });
    const [totalPrice, setTotalPrice] = useState(giftPackage.price);
    const [isProcessing, setIsProcessing] = useState(false);

    const popupRef = useRef(null);
    const { addToCart } = useCart();

    // Packaging options
    const packagingOptions = [
        {
            id: 'premium',
            name: 'Premium Wooden Box',
            price: 0,
            description: 'Elegant wooden gift box with velvet interior',
            image: '🎁'
        },
        {
            id: 'luxury',
            name: 'Luxury Metal Tin',
            price: 25,
            description: 'Premium metal container with embossed design',
            image: '✨'
        },
        {
            id: 'basket',
            name: 'Wicker Basket',
            price: 15,
            description: 'Natural wicker basket with decorative elements',
            image: '🧺'
        },
        {
            id: 'box',
            name: 'Designer Gift Box',
            price: 10,
            description: 'Colorful designer box with premium finish',
            image: '📦'
        }
    ];

    // Ribbon options
    const ribbonOptions = [
        { id: 'gold', name: 'Gold Silk', price: 0, color: 'bg-yellow-400' },
        { id: 'silver', name: 'Silver Satin', price: 5, color: 'bg-gray-300' },
        { id: 'red', name: 'Classic Red', price: 0, color: 'bg-red-500' },
        { id: 'blue', name: 'Royal Blue', price: 0, color: 'bg-blue-500' },
        { id: 'green', name: 'Emerald Green', price: 5, color: 'bg-green-500' }
    ];

    // Card designs
    const cardDesigns = [
        { id: 'elegant', name: 'Elegant Script', price: 0 },
        { id: 'modern', name: 'Modern Minimal', price: 5 },
        { id: 'traditional', name: 'Traditional Ornate', price: 5 },
        { id: 'floral', name: 'Floral Design', price: 10 }
    ];

    // Occasions
    const occasions = [
        'Birthday', 'Anniversary', 'Wedding', 'Graduation',
        'Corporate Gift', 'Thank You', 'Congratulations', 'Eid',
        'Ramadan', 'Christmas', 'New Year', 'Valentine\'s Day'
    ];

    // Calculate total price based on customizations
    useEffect(() => {
        let price = giftPackage.price;

        // Add packaging cost
        const packaging = packagingOptions.find(p => p.id === customization.packaging);
        if (packaging) price += packaging.price;

        // Add ribbon cost
        const ribbon = ribbonOptions.find(r => r.id === customization.ribbon);
        if (ribbon) price += ribbon.price;

        // Add card design cost
        const card = cardDesigns.find(c => c.id === customization.cardDesign);
        if (card) price += card.price;

        setTotalPrice(price);
    }, [customization, giftPackage.price]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    // Handle escape key
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [onClose]);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleAddToCart = () => {
        setIsProcessing(true);

        // Create customized gift item
        const customizedGift = {
            ...giftPackage,
            customization,
            deliveryInfo,
            selectedContents,
            price: totalPrice,
            isGift: true
        };

        // Simulate processing time
        setTimeout(() => {
            addToCart(customizedGift, 1, totalPrice);
            setIsProcessing(false);
            onClose();
        }, 1500);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        {/* Gift Contents */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <FiPackage className="w-5 h-5 mr-2 text-primary-600" />
                                Package Contents
                            </h3>
                            <div className="grid gap-3">
                                {giftPackage.contents.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                        <div className="flex items-center">
                                            <FiCheckCircle className="w-4 h-4 text-success-500 mr-3" />
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Packaging Selection */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <FiGift className="w-5 h-5 mr-2 text-primary-600" />
                                Choose Packaging
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {packagingOptions.map((option) => (
                                    <div
                                        key={option.id}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${customization.packaging === option.id
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-primary-300'
                                            }`}
                                        onClick={() => setCustomization({ ...customization, packaging: option.id })}
                                    >
                                        <div className="text-center">
                                            <div className="text-3xl mb-2">{option.image}</div>
                                            <h4 className="font-medium text-sm">{option.name}</h4>
                                            <p className="text-xs text-neutral-500 mt-1">{option.description}</p>
                                            {option.price > 0 && (
                                                <p className="text-sm font-semibold text-primary-600 mt-2">
                                                    +AED {option.price}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ribbon Selection */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Choose Ribbon</h3>
                            <div className="flex flex-wrap gap-3">
                                {ribbonOptions.map((ribbon) => (
                                    <div
                                        key={ribbon.id}
                                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${customization.ribbon === ribbon.id
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-primary-300'
                                            }`}
                                        onClick={() => setCustomization({ ...customization, ribbon: ribbon.id })}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-4 h-4 rounded-full ${ribbon.color}`}></div>
                                            <span className="text-sm font-medium">{ribbon.name}</span>
                                            {ribbon.price > 0 && (
                                                <span className="text-xs text-primary-600">+{ribbon.price}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        {/* Personal Message */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <FiEdit3 className="w-5 h-5 mr-2 text-primary-600" />
                                Personal Message
                            </h3>
                            <textarea
                                value={customization.message}
                                onChange={(e) => setCustomization({ ...customization, message: e.target.value })}
                                placeholder="Write a heartfelt message for your recipient..."
                                className="w-full h-32 p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                maxLength={200}
                            />
                            <div className="text-right text-sm text-neutral-500 mt-2">
                                {customization.message.length}/200 characters
                            </div>
                        </div>

                        {/* Names */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={customization.senderName}
                                    onChange={(e) => setCustomization({ ...customization, senderName: e.target.value })}
                                    placeholder="Your name"
                                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Recipient's Name
                                </label>
                                <input
                                    type="text"
                                    value={customization.recipientName}
                                    onChange={(e) => setCustomization({ ...customization, recipientName: e.target.value })}
                                    placeholder="Recipient's name"
                                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Occasion */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Occasion
                            </label>
                            <select
                                value={customization.occasion}
                                onChange={(e) => setCustomization({ ...customization, occasion: e.target.value })}
                                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Select occasion</option>
                                {occasions.map((occasion) => (
                                    <option key={occasion} value={occasion}>{occasion}</option>
                                ))}
                            </select>
                        </div>

                        {/* Card Design */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Card Design</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {cardDesigns.map((design) => (
                                    <div
                                        key={design.id}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${customization.cardDesign === design.id
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-neutral-200 hover:border-primary-300'
                                            }`}
                                        onClick={() => setCustomization({ ...customization, cardDesign: design.id })}
                                    >
                                        <div className="text-center">
                                            <h4 className="font-medium text-sm">{design.name}</h4>
                                            {design.price > 0 && (
                                                <p className="text-sm font-semibold text-primary-600 mt-2">
                                                    +AED {design.price}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        {/* Delivery Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <FiTruck className="w-5 h-5 mr-2 text-primary-600" />
                                Delivery Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Recipient's Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={deliveryInfo.recipientPhone}
                                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, recipientPhone: e.target.value })}
                                        placeholder="+971 XX XXX XXXX"
                                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Recipient's Email
                                    </label>
                                    <input
                                        type="email"
                                        value={deliveryInfo.recipientEmail}
                                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, recipientEmail: e.target.value })}
                                        placeholder="email@example.com"
                                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Delivery Address
                                </label>
                                <textarea
                                    value={deliveryInfo.address}
                                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                                    placeholder="Enter complete delivery address"
                                    className="w-full h-24 p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        City
                                    </label>
                                    <select
                                        value={deliveryInfo.city}
                                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="Dubai">Dubai</option>
                                        <option value="Abu Dhabi">Abu Dhabi</option>
                                        <option value="Sharjah">Sharjah</option>
                                        <option value="Ajman">Ajman</option>
                                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                        <option value="Fujairah">Fujairah</option>
                                        <option value="Umm Al Quwain">Umm Al Quwain</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Preferred Delivery Date
                                    </label>
                                    <input
                                        type="date"
                                        value={customization.deliveryDate}
                                        onChange={(e) => setCustomization({ ...customization, deliveryDate: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Special Instructions
                                </label>
                                <textarea
                                    value={deliveryInfo.specialInstructions}
                                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, specialInstructions: e.target.value })}
                                    placeholder="Any special delivery instructions..."
                                    className="w-full h-20 p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div
                ref={popupRef}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
            >
                {/* Header */}
                <div className="relative p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-secondary-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                                <Image
                                    src={giftPackage.fallbackImage}
                                    alt={giftPackage.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-neutral-900">
                                    Customize {giftPackage.name}
                                </h2>
                                <p className="text-neutral-600">Step {step} of 3</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors duration-200"
                        >
                            <FiX className="w-5 h-5 text-neutral-500" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="flex items-center space-x-4">
                            {[1, 2, 3].map((stepNumber) => (
                                <div key={stepNumber} className="flex items-center flex-1">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${stepNumber <= step
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-neutral-200 text-neutral-500'
                                        }`}>
                                        {stepNumber}
                                    </div>
                                    <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${stepNumber < step
                                            ? 'bg-primary-500'
                                            : 'bg-neutral-200'
                                        }`}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-neutral-600">
                            <span>Customize</span>
                            <span>Personalize</span>
                            <span>Delivery</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[50vh] overflow-y-auto">
                    {renderStepContent()}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-neutral-200 bg-neutral-50">
                    {/* Price Summary */}
                    <div className="bg-white rounded-2xl p-4 mb-6 shadow-soft">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-semibold text-neutral-700">Total Price:</span>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-primary-700">AED {totalPrice}</span>
                                {totalPrice > giftPackage.price && (
                                    <div className="text-sm text-neutral-500">
                                        Base: AED {giftPackage.price} + Customizations: AED {totalPrice - giftPackage.price}
                                    </div>
                                )}
                            </div>
                        </div>
                        {giftPackage.originalPrice && giftPackage.originalPrice > totalPrice && (
                            <div className="text-sm text-success-600 text-right">
                                You save AED {giftPackage.originalPrice - totalPrice}!
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        {step > 1 && (
                            <button
                                onClick={handleBack}
                                className="btn-outline px-8"
                            >
                                Back
                            </button>
                        )}

                        <div className="flex-1"></div>

                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                className="btn-primary px-8 flex items-center space-x-2"
                            >
                                <span>Next Step</span>
                                <FiArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                disabled={isProcessing}
                                className="btn-primary px-8 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiShoppingCart className="w-4 h-4" />
                                        <span>Add Gift to Cart</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}