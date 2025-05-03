'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function HomeProductCard({ product }) {
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState(product.price);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [selectedUnit, setSelectedUnit] = useState(product.quantityUnit);
  const { addToCart } = useCart();

  // Calculate total price whenever quantity, customPrice, or selectedUnit changes
  useEffect(() => {
    calculateTotal();
  }, [quantity, customPrice, selectedUnit]);

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
    <div className="bg-white p-2 rounded-lg shadow-sm text-center border border-gray-100">
      <div className="w-full h-20 rounded mb-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-xs text-gray-400">Loading...</span>
        </div>
        {product.image && (
          <Image
            src={product.image.includes('unsplash.com') ?
              // Use a smaller, optimized image from Unsplash with lower quality
              `${product.image.split('?')[0]}?q=60&w=150&fit=crop` :
              product.image
            }
            alt={product.name}
            fill
            className="object-cover"
            unoptimized={true}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
      </div>
      <p className="text-sm font-semibold truncate">{product.name}</p>
      <p className="text-green-600 text-xs">AED {product.price}/{product.quantityUnit}</p>
      <button
        onClick={() => setShowPopup(true)}
        className="mt-1 w-full text-xs bg-green-600 text-white rounded py-1 hover:bg-green-700 transition-colors"
      >
        Add to Cart
      </button>

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
                {product.image ? (
                  <Image
                    src={product.image.includes('unsplash.com') ?
                      // Use a smaller, optimized image from Unsplash with lower quality
                      `${product.image.split('?')[0]}?q=60&w=150&fit=crop` :
                      product.image
                    }
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded object-cover mr-3"
                    unoptimized={true}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center mr-3">
                    <span className="text-xs text-gray-400">No image</span>
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">Original: AED {product.price}/{product.quantityUnit}</p>
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
                    onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                    className="border rounded p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
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
                  Price (AED )
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value) || 0)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            {/* Total Calculation */}
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">AED {totalPrice}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {quantity} {selectedUnit} × AED {customPrice}/{product.quantityUnit}
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
