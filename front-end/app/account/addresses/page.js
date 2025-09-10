'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { FiTruck, FiArrowLeft, FiPlus } from 'react-icons/fi';

export default function AddressesPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
      <Navbar />

      <div className="container-custom py-6">
        <div className="flex items-center mb-6">
          <Link href="/account" className="p-2 hover:bg-white rounded-xl transition-colors mr-3">
            <FiArrowLeft className="w-6 h-6 text-neutral-600" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-neutral-900">Delivery Addresses</h1>
        </div>

        {/* Coming Soon State */}
        <div className="card p-12 text-center">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiTruck className="w-12 h-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
            Delivery Addresses
          </h3>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Manage multiple delivery addresses for convenient shipping. This feature is coming soon to help you send orders anywhere!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
              <FiPlus className="w-4 h-4 mr-2" />
              Add New Address
            </button>
            <Link href="/account" className="btn-outline">
              Back to Account
            </Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}