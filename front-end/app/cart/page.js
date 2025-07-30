'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import CheckoutPopup from '../components/CheckoutPopup';
import UserDetailsPopup from '../components/UserDetailsPopup';
import RemoveConfirmationPopup from '../components/RemoveConfirmationPopup';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

export default function CartPage() {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const { userDetails, checkUserDetails } = useUser();
  const [showCheckout, setShowCheckout] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [itemToRemove, setItemToRemove] = useState(null);

  // Handle checkout button click
  const handleCheckout = () => {
    // Check if user details exist, if not show popup
    const hasDetails = checkUserDetails();

    // Only show checkout popup if user details exist
    if (hasDetails) {
      setShowCheckout(true);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + (parseFloat(item.price) * item.quantity),
    0
  );

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    // Update local state for immediate UI feedback
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQuantity
    }));

    // Update cart context
    updateCartItemQuantity(itemId, newQuantity);
  };

  // Handle remove item
  const handleRemoveItem = (item) => {
    // Set the item to remove, which will show the confirmation popup
    setItemToRemove(item);
  };

  // Handle confirm remove
  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove._id);
      setItemToRemove(null);
    }
  };

  // Handle cancel remove
  const handleCancelRemove = () => {
    setItemToRemove(null);
  };

  // Calculate shipping fee (for display purposes)
  const shippingFee = 30;
  const grandTotal = totalPrice + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pb-20">
        <Navbar />
        <UserDetailsPopup />

        <div className="container-custom py-16">
          {/* Empty Cart State */}
          <div className="text-center">
            <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🛒</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary">
                Start Shopping
              </Link>
              <Link href="/categories" className="btn-outline">
                Browse Categories
              </Link>
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <UserDetailsPopup />

      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-neutral-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <Link href="/" className="btn-outline hidden md:flex">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Delivery Address
                </h3>
                <button
                  onClick={() => checkUserDetails()}
                  className="btn-outline btn-sm"
                >
                  {userDetails ? 'Change' : 'Add'}
                </button>
              </div>

              {userDetails ? (
                <div className="bg-neutral-50 rounded-xl p-4">
                  <p className="font-semibold text-neutral-900 mb-1">{userDetails.name}</p>
                  <p className="text-neutral-600 text-sm mb-1">{userDetails.address}</p>
                  <p className="text-neutral-600 text-sm">{userDetails.phone}</p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-800 text-sm">
                    Please add your delivery details to proceed with checkout
                  </p>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Cart Items ({cartItems.length})
                </h3>
                <button className="text-sm text-neutral-500 hover:text-red-500 transition-colors">
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 p-4 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-medium">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          unoptimized={!item.image.includes('unsplash.com')}
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-xs text-neutral-400">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-neutral-600 mb-2">
                        AED {item.price}/{item.quantityUnit}
                      </p>

                      {/* Mobile Quantity Controls */}
                      <div className="flex items-center justify-between md:hidden">
                        <div className="flex items-center gap-3 bg-white rounded-xl p-2">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <span className="text-sm font-medium">−</span>
                          </button>
                          <span className="font-semibold min-w-[2rem] text-center">
                            {quantities[item._id] || item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                          >
                            <span className="text-sm font-medium">+</span>
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg text-neutral-900">
                            AED {(parseFloat(item.price) * (quantities[item._id] || item.quantity)).toFixed(2)}
                          </p>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="text-red-500 hover:text-red-700 text-sm transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Quantity Controls */}
                    <div className="hidden md:flex items-center gap-3 bg-white rounded-xl p-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-lg font-medium">−</span>
                      </button>
                      <span className="font-semibold text-lg min-w-[3rem] text-center">
                        {quantities[item._id] || item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                      >
                        <span className="text-lg font-medium">+</span>
                      </button>
                    </div>

                    {/* Desktop Price and Remove */}
                    <div className="hidden md:block text-right min-w-[120px]">
                      <p className="font-bold text-xl text-neutral-900 mb-2">
                        AED {(parseFloat(item.price) * (quantities[item._id] || item.quantity)).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="text-red-500 hover:text-red-700 text-sm transition-colors hover:underline"
                      >
                        Remove
                    </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="xl:col-span-1">
            <div className="card p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>AED {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span className="text-success-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Service Fee</span>
                  <span>AED {shippingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-neutral-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      AED {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={!userDetails}
                className="w-full btn-primary btn-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Proceed to Checkout
              </button>

              {!userDetails && (
                <p className="text-sm text-yellow-600 text-center">
                  Please add delivery details to checkout
                </p>
              )}

              {/* Continue Shopping */}
              <div className="text-center mt-4">
                <Link href="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-center text-sm text-neutral-500">
                  <svg className="w-4 h-4 mr-2 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Checkout Bar */}
        <div className="xl:hidden fixed bottom-20 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-40">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-neutral-600">Total Amount</p>
              <p className="text-xl font-bold text-primary-600">AED {grandTotal.toFixed(2)}</p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={!userDetails}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      {/* Popups and Modals */}
      {showCheckout && (
        <CheckoutPopup
          onClose={() => setShowCheckout(false)}
          cartItems={cartItems}
          totalPrice={totalPrice}
        />
      )}

      {/* Remove Confirmation Popup */}
      {itemToRemove && (
        <RemoveConfirmationPopup
            itemName={itemToRemove.name}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
}
