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
      <div className="min-h-screen bg-gray-100 pb-16">
        <Navbar />
        <UserDetailsPopup />
        <div className="px-4 py-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Start Shopping
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Navbar />
      <UserDetailsPopup />

      {/* Header */}
      <header className="bg-green-600 px-4 pt-4 pb-6 text-white">
        <h1 className="text-2xl font-bold">My Cart ({cartItems.length})</h1>
      </header>

      <div className="px-4 space-y-4 mt-4">
        {/* Delivery Address */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-medium text-gray-500 mb-2 text-sm">DELIVERY ADDRESS</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{userDetails?.name || 'Add delivery details'}</p>
              <p className="text-gray-500 text-sm">{userDetails?.address || 'No address provided'}</p>
              <p className="text-gray-500 text-sm">{userDetails?.phone || ''}</p>
            </div>
            <button
              onClick={() => checkUserDetails()}
              className="text-green-600 font-medium"
            >
              {userDetails ? 'Change' : 'Add'}
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-500 text-sm">ITEMS ({cartItems.length})</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center p-4">
                <div className="relative w-16 h-16 mr-3 rounded-lg overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized={!item.image.includes('unsplash.com')}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">AED {item.price}/{item.quantityUnit}</p>
                    </div>
                    <p className="font-bold">AED {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-gray-500"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{quantities[item._id] || item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-full text-gray-500"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        {/* <div className="bg-white rounded-lg p-4 shadow-md">
          <h3 className="font-bold text-lg mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>AED {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span>AED {shippingFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>AED {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div> */}

        {/* Continue Shopping */}
        <div className="text-center">
          <Link href="/" className="text-green-600 inline-block py-2">
            ← Continue Shopping
          </Link>
        </div>

        {/* Spacer for fixed checkout button */}
        <div className="h-20"></div>

        {/* Fixed Checkout Button */}
        <div className="fixed bottom-16 left-0 right-0 px-4 z-10">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">Total Amound</span>
              <span className="font-bold text-lg">AED {grandTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>

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
