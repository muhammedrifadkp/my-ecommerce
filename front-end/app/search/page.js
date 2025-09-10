'use client';

import { Suspense } from 'react';
import SearchPageContent from './SearchPageContent';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

function SearchPageFallback() {
  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      <Navbar />
      
      {/* Header with Search Input */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="container-custom py-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-neutral-100 rounded-lg animate-pulse w-9 h-9"></div>
            <div className="flex-1">
              <div className="w-full h-12 bg-neutral-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Loading Content */}
      <main className="container-custom py-6">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p className="text-neutral-600">Loading search...</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}