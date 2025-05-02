'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { useUser } from '../../context/UserContext';
import UserDetailsPopup from '../../components/UserDetailsPopup';
import { FiArrowLeft, FiCamera } from 'react-icons/fi';

export default function ProfilePage() {
  const router = useRouter();
  const { userDetails, setUserDetails, checkUserDetails } = useUser();

  // Initialize form data with default values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    profileImage: 'https://tse4.mm.bing.net/th?id=OIP.Wim1Ar6paI5-FdmrOedMMAHaHa&pid=Api&P=0&h=180'
  });

  // Update form data when userDetails changes
  useEffect(() => {
    // Check if user details exist
    checkUserDetails();

    if (userDetails) {
      // Extract city, state, and pincode from address if available
      let addressParts = { city: 'Bangalore', state: 'Karnataka', pincode: '560001' };
      if (userDetails.address) {
        const parts = userDetails.address.split(',');
        if (parts.length >= 3) {
          addressParts = {
            city: parts[parts.length - 3]?.trim() || 'Bangalore',
            state: parts[parts.length - 2]?.trim() || 'Karnataka',
            pincode: parts[parts.length - 1]?.trim() || '560001'
          };
        }
      }

      setFormData({
        name: userDetails.name || '',
        email: userDetails.email || '',
        phone: userDetails.phone || '',
        address: userDetails.address ? userDetails.address.split(',')[0]?.trim() || '' : '',
        ...addressParts,
        profileImage: 'https://tse4.mm.bing.net/th?id=OIP.Wim1Ar6paI5-FdmrOedMMAHaHa&pid=Api&P=0&h=180'
      });
    }
  }, [userDetails, checkUserDetails]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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
    setTimeout(() => {
      setLoading(false);
      alert('Profile updated successfully!');
      router.push('/account');
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      <Navbar />
      <UserDetailsPopup />

      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6 mt-4">
          <Link href="/account" className="mr-3">
            <FiArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={formData.profileImage}
                alt={formData.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full">
              <FiCamera />
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
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
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PIN Code
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}
