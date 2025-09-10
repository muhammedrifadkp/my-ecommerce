'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiStar, FiEye, FiTrendingUp } from 'react-icons/fi';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

// Helper function to get emoji based on product category
const getProductEmoji = (category) => {
  const categoryEmojis = {
    'nuts': '🥜',
    'dates': '🌴',
    'dried-fruits': '🍇',
    'premium-dry-fruits': '🍑',
    'almonds': '🌰',
    'cashews': '🥜',
    'walnuts': '🌰',
    'pistachios': '🥜',
    'default': '🌰'
  };

  return categoryEmojis[category?.toLowerCase()] || categoryEmojis['default'];
};

export default function ProductCard({ product }) {
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState(product.price);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [selectedUnit, setSelectedUnit] = useState(product.quantityUnit);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  // Calculate total price whenever quantity, customPrice, or selectedUnit changes
  useEffect(() => {
    calculateTotal();
  }, [quantity, customPrice, selectedUnit]);

  const calculateTotal = () => {
    let unitMultiplier = 1;

    // Apply unit conversion if needed
    if (product.quantityUnit === 'kg' && selectedUnit === 'g') {
      unitMultiplier = 0.001;
    } else if (product.quantityUnit === 'g' && selectedUnit === 'kg') {
      unitMultiplier = 1000;
    } else if (product.quantityUnit === 'dozen' && selectedUnit === 'piece') {
      unitMultiplier = 1 / 12;
    } else if (product.quantityUnit === 'piece' && selectedUnit === 'dozen') {
      unitMultiplier = 12;
    }

    const adjustedQuantity = quantity * unitMultiplier;
    const total = parseFloat(customPrice) * adjustedQuantity;
    setTotalPrice(total.toFixed(2));
  };

  const handleAddToCart = () => {
    let finalQuantity = quantity;

    // Apply unit conversion if needed
    if (product.quantityUnit === 'kg' && selectedUnit === 'g') {
      finalQuantity = quantity / 1000;
    } else if (product.quantityUnit === 'g' && selectedUnit === 'kg') {
      finalQuantity = quantity * 1000;
    } else if (product.quantityUnit === 'dozen' && selectedUnit === 'piece') {
      finalQuantity = quantity / 12;
    } else if (product.quantityUnit === 'piece' && selectedUnit === 'dozen') {
      finalQuantity = quantity * 12;
    }

    addToCart(product, finalQuantity, customPrice);
    setShowPopup(false);
    setQuantity(1);
    setCustomPrice(product.price);
    setSelectedUnit(product.quantityUnit);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1, product.price);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Generate product rating (mock for demo)
  const rating = 4.2 + Math.random() * 0.8;
  const reviewCount = Math.floor(Math.random() * 200) + 20;

  return (
    <>
      <div className="product-card group relative">
        {/* Product Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="badge-gradient flex items-center space-x-1">
              <FiTrendingUp className="w-3 h-3" />
              <span>Bestseller</span>
            </div>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:shadow-medium transition-all duration-300 opacity-0 group-hover:opacity-100 interactive"
          aria-label="Add to wishlist"
        >
          {isWishlisted ? (
            <HiHeart className="w-5 h-5 text-red-500" />
          ) : (
            <HiOutlineHeart className="w-5 h-5 text-neutral-600" />
          )}
        </button>

        {/* Product Image Container */}
        <div className="relative h-64 md:h-72 overflow-hidden rounded-t-3xl bg-gradient-to-br from-neutral-100 to-neutral-200">
          {!imageError && product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`product-image object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              priority={product.featured}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
              <div className="text-center text-primary-600">
                <div className="text-6xl mb-3">{getProductEmoji(product.category)}</div>
                <span className="text-sm font-medium">Premium Quality</span>
                <div className="text-xs text-primary-500 mt-1">{product.category?.replace('-', ' ').toUpperCase()}</div>
              </div>
            </div>
          )}

          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 loading-skeleton"></div>
          )}

          {/* Product Overlay */}
          <div className="product-overlay">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPopup(true)}
                  className="btn-primary btn-sm shadow-xl backdrop-blur-sm"
                >
                  <FiEye className="w-4 h-4 mr-2" />
                  Quick View
                </button>
                <button
                  onClick={handleQuickAdd}
                  className="btn-secondary btn-sm shadow-xl backdrop-blur-sm"
                >
                  <FiShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Premium Quality Badge */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="glass rounded-xl px-3 py-1">
              <span className="text-xs font-medium text-neutral-700">Premium Quality</span>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-6 bg-white rounded-b-3xl">
          {/* Product Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="badge-primary text-xs">
              {product.category?.replace('-', ' ').toUpperCase() || 'PREMIUM'}
            </span>
            <div className="flex items-center space-x-1">
              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-neutral-600">
                {rating.toFixed(1)}
              </span>
              <span className="text-xs text-neutral-400">({reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-semibold text-lg text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Product Description */}
          {product.description && (
            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Nutritional Highlights */}
          <div className="flex flex-wrap gap-2 mb-4">
            {['Natural', 'No Preservatives', 'Rich in Fiber'].map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center px-2 py-1 rounded-lg bg-success-50 text-success-700 text-xs font-medium"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-primary-700">
                  AED {product.price}
                </span>
                <span className="text-sm text-neutral-500">
                  /{product.quantityUnit}
                </span>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-neutral-400 line-through">
                  AED {product.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={() => setShowPopup(true)}
              className="btn-primary interactive flex items-center space-x-2"
              aria-label={`Add ${product.name} to cart`}
            >
              <FiShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Product Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            {/* Popup Header */}
            <div className="relative p-6 border-b border-neutral-200">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                  {product.image && !imageError ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">{getProductEmoji(product.category)}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-neutral-900">{product.name}</h3>
                  <p className="text-sm text-neutral-500">Original: AED {product.price}/{product.quantityUnit}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                    </div>
                    <span className="badge-primary">{product.category?.toUpperCase() || 'PREMIUM'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Popup Content */}
            <div className="p-6 space-y-6">
              {/* Quantity and Unit Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
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

              {/* Custom Price */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Price per {product.quantityUnit} (AED)
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value) || 0)}
                  className="input"
                />
              </div>

              {/* Total Calculation */}
              <div className="card-premium p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-neutral-700">Total:</span>
                  <span className="text-2xl font-bold text-primary-700">AED {totalPrice}</span>
                </div>
                <div className="text-sm text-neutral-500">
                  {quantity} {selectedUnit} × AED {customPrice}/{product.quantityUnit}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary btn-lg flex-1 interactive"
                >
                  <FiShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="btn-outline px-6"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}