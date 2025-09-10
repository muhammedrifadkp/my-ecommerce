'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiX } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

export default function UserDetailsPopup() {
  const { userDetails, setUserDetails, showDetailsPopup, setShowDetailsPopup } = useUser();
  
  const [formData, setFormData] = useState({
    name: userDetails?.name || '',
    address: userDetails?.address || '',
    phone: userDetails?.phone || '',
    email: userDetails?.email || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[0-9\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUserDetails(formData);
    setIsSubmitting(false);
  };

  if (!showDetailsPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-6 relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <HiSparkles className="w-6 h-6 text-yellow-300" />
                <h2 className="text-xl font-display font-bold">Welcome!</h2>
              </div>
              <button
                onClick={() => setShowDetailsPopup(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <p className="text-primary-100 text-sm">
              Let's get to know you better. Please provide your details to continue.
            </p>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name Field */}
          <div className="input-group">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input ${errors.name ? 'input-error' : ''}`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && (
              <p className="text-error-600 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          {/* Email Field */}
          <div className="input-group">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && (
              <p className="text-error-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          {/* Phone Field */}
          <div className="input-group">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <FiPhone className="input-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`input ${errors.phone ? 'input-error' : ''}`}
                placeholder="+971 50 123 4567"
              />
            </div>
            {errors.phone && (
              <p className="text-error-600 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
          
          {/* Address Field */}
          <div className="input-group">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Delivery Address *
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-4 top-4 text-neutral-400 w-5 h-5" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className={`w-full pl-12 pr-5 py-4 rounded-2xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:shadow-colored-primary resize-none ${errors.address ? 'border-error-300 focus:ring-error-500' : ''}`}
                placeholder="Enter your complete delivery address"
              />
            </div>
            {errors.address && (
              <p className="text-error-600 text-xs mt-1">{errors.address}</p>
            )}
          </div>
          
          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowDetailsPopup(false)}
              className="btn-ghost flex-1"
              disabled={isSubmitting}
            >
              Skip for Now
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 relative"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner w-4 h-4 mr-2" />
                  Saving...
                </div>
              ) : (
                'Save Details'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
