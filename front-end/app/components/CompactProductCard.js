'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CompactProductCard({ product }) {
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState(product.price);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [selectedUnit, setSelectedUnit] = useState(product.quantityUnit);
  const { addToCart } = useCart();

  // Calculate the total price based on quantity, price, and unit
  const calculateTotal = () => {
    let unitMultiplier = 1;

    // Apply unit conversion if needed
    if (product.quantityUnit === 'kg' && selectedUnit === 'g') {
      unitMultiplier = 0.001; // 1g = 0.001kg
    } else if (product.quantityUnit === 'g' && selectedUnit === 'kg') {
      unitMultiplier = 1000; // 1kg = 1000g
    } else if (product.quantityUnit === 'dozen' && selectedUnit === 'piece') {
      unitMultiplier = 1/12; // 1 piece = 1/12 dozen
    } else if (product.quantityUnit === 'piece' && selectedUnit === 'dozen') {
      unitMultiplier = 12; // 1 dozen = 12 pieces
    }

    // Calculate the adjusted quantity based on the unit conversion
    const adjustedQuantity = quantity * unitMultiplier;

    // Calculate the total price
    const total = parseFloat(customPrice) * adjustedQuantity;
    setTotalPrice(total.toFixed(2));
  };

  const handleAddToCart = () => {
    // Convert the quantity based on the selected unit
    let finalQuantity = quantity;

    // Apply unit conversion if needed
    if (product.quantityUnit === 'kg' && selectedUnit === 'g') {
      finalQuantity = quantity / 1000; // Convert g to kg
    } else if (product.quantityUnit === 'g' && selectedUnit === 'kg') {
      finalQuantity = quantity * 1000; // Convert kg to g
    } else if (product.quantityUnit === 'dozen' && selectedUnit === 'piece') {
      finalQuantity = quantity / 12; // Convert pieces to dozen
    } else if (product.quantityUnit === 'piece' && selectedUnit === 'dozen') {
      finalQuantity = quantity * 12; // Convert dozen to pieces
    }

    // Add to cart with the converted quantity and custom price
    addToCart(product, finalQuantity, customPrice);

    // Reset and close popup
    setShowPopup(false);
    setQuantity(1);
    setCustomPrice(product.price);
    setSelectedUnit(product.quantityUnit);
  };

  return (
    <>
      <div className="group card-interactive overflow-hidden bg-white">
        {/* Product Image */}
        <div className="relative h-40 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image || '/images/products/placeholder.jpg'} // REPLACE: Add your product placeholder image here
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl mb-2 block">📦</span>
                <span className="text-neutral-400 text-sm">No image</span>
              </div>
            </div>
          )}

          {/* Fallback for failed image loads */}
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center hidden">
            <div className="text-center">
              <span className="text-4xl mb-2 block">❌</span>
              <span className="text-neutral-400 text-sm">Image unavailable</span>
            </div>
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowPopup(true)}
              className="bg-white text-neutral-800 px-4 py-2 rounded-xl font-medium transform scale-0 group-hover:scale-100 transition-all duration-300 shadow-medium hover:shadow-large hover:scale-105"
            >
              Quick Add
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.category && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                product.category?.toLowerCase() === 'premium-dry-fruits' ? 'bg-amber-100 text-amber-800' :
                product.category?.toLowerCase() === 'nuts-seeds' ? 'bg-secondary-100 text-secondary-800' :
                product.category?.toLowerCase() === 'dates-exotic' ? 'bg-success-100 text-success-800' :
                'bg-red-100 text-red-800'
              }`}>
                {product.category}
              </span>
            )}
            {product.discount && (
              <span className="badge-error text-xs font-bold">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-600 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        {/* Product Info */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-neutral-900 text-sm mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {product.name || 'Unnamed Product'}
            </h3>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary-600">
                AED {product.price || '0'}
              </span>
              <span className="text-xs text-neutral-500">
                per {product.quantityUnit || 'unit'}
              </span>
            </div>

            {product.rating && (
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-yellow-700">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Stock indicator */}
          {product.stock !== undefined && (
            <div className="mb-3">
              {product.stock > 0 ? (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
                  <span className="text-xs text-neutral-600">
                    {product.stock < 5 ? (
                      <span className="text-secondary-600 font-medium">Only {product.stock} left</span>
                    ) : (
                      <span>In stock</span>
                    )}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-xs text-red-600 font-medium">Out of stock</span>
                </div>
              )}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() => setShowPopup(true)}
            className="w-full btn-primary btn-sm group-hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={product.stock !== undefined && product.stock <= 0}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {product.stock !== undefined && product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Modern Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h3 className="text-xl font-display font-bold text-neutral-900">Add to Cart</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="relative w-20 h-20 mr-4 rounded-2xl overflow-hidden shadow-medium">
                  <Image
                    src={product.image || '/images/products/placeholder.jpg'} // REPLACE: Add your product placeholder image here
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 mb-1">{product.name}</h4>
                  <p className="text-sm text-neutral-500 mb-2">
                    Original: AED {product.price}/{product.quantityUnit}
                  </p>
                  {product.category && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      product.category?.toLowerCase() === 'premium-dry-fruits' ? 'bg-amber-100 text-amber-800' :
                      product.category?.toLowerCase() === 'nuts-seeds' ? 'bg-secondary-100 text-secondary-800' :
                      product.category?.toLowerCase() === 'dates-exotic' ? 'bg-success-100 text-success-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Quantity and Unit Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(Number(e.target.value) || 0);
                        calculateTotal();
                      }}
                      className="input"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Unit
                    </label>
                    <select
                      value={selectedUnit}
                      onChange={(e) => {
                        setSelectedUnit(e.target.value);
                        calculateTotal();
                      }}
                      className="input"
                    >
                      <option value={product.quantityUnit}>{product.quantityUnit}</option>
                      {product.quantityUnit === 'kg' && <option value="g">g</option>}
                      {product.quantityUnit === 'g' && <option value="kg">kg</option>}
                      {product.quantityUnit === 'dozen' && <option value="piece">piece</option>}
                      {product.quantityUnit === 'piece' && <option value="dozen">dozen</option>}
                    </select>
                  </div>
                </div>

                {/* Price Input */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Price per {product.quantityUnit} (AED)
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={customPrice}
                    onChange={(e) => {
                      setCustomPrice(Number(e.target.value) || 0);
                      calculateTotal();
                    }}
                    className="input"
                    placeholder="Enter custom price"
                  />
                </div>
              </div>

              {/* Total Calculation */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-2xl border border-primary-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-neutral-700">Total Amount:</span>
                  <span className="font-bold text-2xl text-primary-600">AED {totalPrice}</span>
                </div>
                <div className="text-sm text-neutral-600">
                  {quantity} {selectedUnit} × AED {customPrice}/{product.quantityUnit}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 p-6 border-t border-neutral-100">
              <button
                onClick={() => setShowPopup(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
