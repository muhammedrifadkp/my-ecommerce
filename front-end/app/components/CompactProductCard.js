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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 hover:border-green-200">
      <div className="relative h-36 w-full">
        {product.image ? (
          <Image
            src={product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&auto=format'}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        {/* Hidden fallback that will be shown if image fails to load */}
        <div className="absolute inset-0 bg-gray-200 hidden flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium
            ${product.category?.toLowerCase() === 'vegetables' ? 'bg-green-100 text-green-800' :
              product.category?.toLowerCase() === 'fruits' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'}`}>
            {product.category}
          </span>
        </div>

        {/* Discount badge (if applicable) */}
        {product.discount && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Sale
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1 truncate">{product.name || 'Unnamed Product'}</h3>
        <div className="flex justify-between items-center mb-2">
          <p className="text-green-600 font-semibold">AED{product.price || '0'}/{product.quantityUnit || 'unit'}</p>
          {product.rating && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Stock indicator */}
        {product.stock !== undefined && (
          <div className="mb-2">
            {product.stock > 0 ? (
              <span className="text-xs text-gray-500">
                {product.stock < 5 ? (
                  <span className="text-orange-600">Only {product.stock} left</span>
                ) : (
                  <span>In stock</span>
                )}
              </span>
            ) : (
              <span className="text-xs text-red-600">Out of stock</span>
            )}
          </div>
        )}

        <button
          onClick={() => setShowPopup(true)}
          className="w-full bg-green-600 text-white text-xs py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
          disabled={product.stock !== undefined && product.stock <= 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Add to Cart
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add to Cart</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="relative w-16 h-16 mr-3 rounded overflow-hidden">
                  <Image
                    src={product.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=300&fit=crop&auto=format'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">Original: AED{product.price}/{product.quantityUnit}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {/* Quantity and Unit Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => {
                      setSelectedUnit(e.target.value);
                      calculateTotal();
                    }}
                    className="border rounded p-2 w-full"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (AED)
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
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            {/* Total Calculation */}
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">AED{totalPrice}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {quantity} {selectedUnit} × AED{customPrice}/{product.quantityUnit}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-4 py-2 rounded flex-1 hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-200 px-4 py-2 rounded flex-1 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
