'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { useUser } from '../../context/UserContext';
import UserDetailsPopup from '../../components/UserDetailsPopup';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FiArrowLeft, FiCamera, FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiEdit } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

export default function ProfilePage() {
  const router = useRouter();
  const { userDetails, setUserDetails, isLoaded } = useUser();

  // Initialize form data with default values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dubai',
    state: 'Dubai',
    pincode: '00000'
  });

  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Update form data when userDetails changes
  useEffect(() => {
    const initializeProfile = async () => {
      setIsPageLoading(true);
      
      // Wait for context to load
      if (!isLoaded) {
        return;
      }

      if (userDetails) {
        // Extract city, state, and pincode from address if available
        let addressParts = { city: 'Dubai', state: 'Dubai', pincode: '00000' };
        if (userDetails.address) {
          const parts = userDetails.address.split(',');
          if (parts.length >= 3) {
            addressParts = {
              city: parts[parts.length - 3]?.trim() || 'Dubai',
              state: parts[parts.length - 2]?.trim() || 'Dubai',
              pincode: parts[parts.length - 1]?.trim() || '00000'
            };
          }
        }

        setFormData({
          name: userDetails.name || '',
          email: userDetails.email || '',
          phone: userDetails.phone || '',
          address: userDetails.address ? userDetails.address.split(',')[0]?.trim() || '' : '',
          ...addressParts
        });
      }
      
      setIsPageLoading(false);
    };

    initializeProfile();
  }, [userDetails, isLoaded]);

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
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      // Construct full address
      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`;

      // Save user details to context
      setUserDetails({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: fullAddress
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        router.push('/account');
      }, 2000);
      
    } catch (error) {
      console.error('Profile update error:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" text="Loading your profile..." />
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
      <Navbar />
      <UserDetailsPopup />

      <div className="container-custom py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/account" className="p-2 hover:bg-white rounded-xl transition-colors mr-3">
            <FiArrowLeft className="w-6 h-6 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-neutral-900">Edit Profile</h1>
            <p className="text-sm text-neutral-600">Update your personal information</p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="card p-4 mb-6 bg-success-50 border border-success-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                <FiSave className="w-4 h-4 text-success-600" />
              </div>
              <p className="text-success-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <div className="card p-6">
          {/* Profile Icon Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 shadow-large border-4 border-white flex items-center justify-center">
                <FiUser className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-large hover:bg-primary-700 transition-colors">
                <FiCamera className="w-5 h-5" />
              </button>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-medium">
                <HiSparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-xl">
                <p className="text-error-800 text-sm">{errors.general}</p>
              </div>
            )}

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
                Street Address *
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-4 text-neutral-400 w-5 h-5" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full pl-12 pr-5 py-4 rounded-2xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:shadow-colored-primary resize-none ${errors.address ? 'border-error-300 focus:ring-error-500' : ''}`}
                  placeholder="Enter your street address"
                />
              </div>
              {errors.address && (
                <p className="text-error-600 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* City, State, Pincode Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="input-group">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`input ${errors.city ? 'input-error' : ''}`}
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-error-600 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div className="input-group">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  State/Emirate *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`input ${errors.state ? 'input-error' : ''}`}
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-error-600 text-xs mt-1">{errors.state}</p>
                )}
              </div>

              <div className="input-group">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter PIN code"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/account"
                className="btn-outline flex-1 text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 relative"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner w-4 h-4 mr-2" />
                    Saving Changes...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FiSave className="w-4 h-4 mr-2" />
                    Save Changes
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
