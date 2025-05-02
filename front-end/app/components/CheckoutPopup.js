'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const CheckoutPopup = ({ onClose, cartItems, totalPrice }) => {
  const { clearCart } = useCart();
  const { userDetails, setUserDetails } = useUser();
  const [formData, setFormData] = useState({
    name: userDetails?.name || '',
    address: userDetails?.address || '',
    phone: userDetails?.phone || '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Update form data when userDetails changes
  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name || '',
        address: userDetails.address || '',
        phone: userDetails.phone || '',
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user details to context and localStorage
    setUserDetails({
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      // If there's an email in userDetails, keep it
      ...(userDetails?.email && { email: userDetails.email })
    });

    // Create WhatsApp message with order details
    const storePhoneNumber = '916238032586'; // Replace with actual store phone number

    let message = `*New Order*\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Address: ${formData.address}\n`;
    message += `Phone: ${formData.phone}\n\n`;

    message += `*Order Items*\n`;
    cartItems.forEach(item => {
      message += `${item.name} (${item.quantity} x ₹${item.price}) = ₹${(parseFloat(item.price) * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total Amount: ₹${totalPrice.toFixed(2)}*`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the message
    window.open(`https://wa.me/${storePhoneNumber}?text=${encodedMessage}`, '_blank');

    // Show confirmation popup instead of closing
    setShowConfirmation(true);
  };

  // Get addOrder function from UserContext
  const { addOrder } = useUser();

  // Handle confirmation of WhatsApp message sent
  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      // Add the order to the order history
      const orderDate = new Date();

      // Calculate total price
      const orderTotal = cartItems.reduce(
        (total, item) => total + (parseFloat(item.price) * item.quantity),
        0
      );

      // Create order object
      const order = {
        id: 'ORD' + Date.now().toString().slice(-6),
        date: orderDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          image: item.image
        })),
        total: orderTotal,
        status: 'Processing',
        customerDetails: {
          name: formData.name,
          address: formData.address,
          phone: formData.phone
        }
      };

      // Add order to history
      addOrder(order);

      // Clear the cart if user confirms they sent the message
      clearCart();
    }

    // Close the popup
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        {!showConfirmation ? (
          // Checkout Form
          <>
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          // Confirmation Popup
          <>
            <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>

            <p className="mb-6">
              Did you send your order details in WhatsApp? If you confirm, your cart will be cleared.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleConfirmation(true)}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Yes, I Sent It
              </button>
              <button
                onClick={() => handleConfirmation(false)}
                className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
              >
                No, Keep My Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPopup;
