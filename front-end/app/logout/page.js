'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../components/LoadingSpinner';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Clear all localStorage data
        localStorage.removeItem('userDetails');
        localStorage.removeItem('orderHistory');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminToken');

        // Wait a moment to show the loading state
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to home page
        router.push('/');
        
        // Reload the page to reset all contexts
        window.location.reload();
      } catch (error) {
        console.error('Logout error:', error);
        // Still redirect even if there's an error
        router.push('/');
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <div className="mt-6">
          <h2 className="text-xl font-display font-semibold text-neutral-900 mb-2">
            Signing you out...
          </h2>
          <p className="text-neutral-600">
            Thank you for visiting Al MASHHOUR. See you soon!
          </p>
        </div>
      </div>
    </div>
  );
}