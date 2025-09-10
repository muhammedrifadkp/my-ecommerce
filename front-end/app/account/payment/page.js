'use client';

import Link from 'next/link';
import Navbar from '../../components/Navbar';
import BottomNav from '../../components/BottomNav';
import { FiCreditCard, FiArrowLeft, FiPlus } from 'react-icons/fi';

export default function PaymentPage() {
  return (
    <div className="bg-gradient-to-br from-neutral-50 via-white to-neutral-100 min-h-screen pb-16">
      <Navbar />

      <div className="container-custom py-6">
        <div className="flex items-center mb-6">
          <Link href="/account" className="p-2 hover:bg-white rounded-xl transition-colors mr-3">
            <FiArrowLeft className="w-6 h-6 text-neutral-600" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-neutral-900">Payment Methods</h1>
        </div>

        {/* Coming Soon State */}
        <div className="card p-12 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCreditCard className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
            Payment Methods
          </h3>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Manage your payment methods for faster checkout. This feature is coming soon to make your shopping experience even better!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
              <FiPlus className="w-4 h-4 mr-2" />
              Add Payment Method
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