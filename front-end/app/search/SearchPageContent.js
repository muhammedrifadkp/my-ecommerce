'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiArrowLeft } from 'react-icons/fi';
import CompactProductCard from '../components/CompactProductCard';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { apiClient } from '../../utils/api';

export default function SearchPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [currentQuery, setCurrentQuery] = useState(query);
    const searchInputRef = useRef(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const searchQuery = currentQuery.trim();

        if (searchQuery.length >= 2) {
            // Update URL without full page reload
            const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
            router.push(newUrl);

            // Perform search
            await performSearch(searchQuery);
        } else if (searchQuery.length > 0) {
            alert('Please enter at least 2 characters to search');
        }
    };

    useEffect(() => {
        setCurrentQuery(query);
        if (query && query.trim().length >= 2) {
            performSearch(query);
        } else {
            setSearchResults([]);
            setSearchPerformed(false);
        }
    }, [query]);

    const performSearch = async (searchQuery) => {
        try {
            setLoading(true);
            setError('');
            setSearchPerformed(true);

            const results = await apiClient.searchProducts(searchQuery);
            setSearchResults(results || []);
        } catch (error) {
            console.error('Search error:', error);
            setError(error.message || 'Failed to search products');
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-50 min-h-screen pb-16">
            <Navbar />

            {/* Header with Search Input */}
            <header className="bg-white shadow-sm border-b border-neutral-200">
                <div className="container-custom py-4">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
                            aria-label="Go back to home"
                        >
                            <FiArrowLeft className="w-5 h-5 text-neutral-600" />
                        </Link>
                        <div className="flex-1">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    ref={searchInputRef}
                                    type="search"
                                    placeholder="Search products..."
                                    value={currentQuery}
                                    onChange={(e) => setCurrentQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white shadow-sm"
                                    autoFocus
                                />
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Results */}
            <main className="container-custom py-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
                        <p className="text-neutral-600">Searching products...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <FiSearch className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Search Error</h2>
                        <p className="text-neutral-600 mb-6">{error}</p>
                        <Link
                            href="/"
                            className="btn-primary"
                        >
                            Back to Home
                        </Link>
                    </div>
                ) : !currentQuery || currentQuery.trim().length < 2 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                            <FiSearch className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-neutral-900 mb-2">Start Your Search</h2>
                        <p className="text-neutral-600 mb-6">
                            Enter at least 2 characters to search our premium collection of dry fruits, nuts, and dates.
                        </p>
                        <Link
                            href="/"
                            className="btn-primary"
                        >
                            Browse All Products
                        </Link>
                    </div>
                ) : searchPerformed && searchResults.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                            <FiSearch className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-neutral-900 mb-2">No Results Found</h2>
                        <p className="text-neutral-600 mb-6">
                            We couldn't find any products matching "{currentQuery}". Try different keywords or browse our categories.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="btn-primary"
                            >
                                Browse All Products
                            </Link>
                            <Link
                                href="/categories"
                                className="btn-outline"
                            >
                                View Categories
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Results Summary */}
                        <div className="mb-6">
                            <p className="text-neutral-600">
                                Found <span className="font-semibold text-neutral-900">{searchResults.length}</span> products
                                {currentQuery && ` for "${currentQuery}"`}
                            </p>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {searchResults.map((product, index) => (
                                <div
                                    key={product._id}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    className="animate-fade-in-up"
                                >
                                    <CompactProductCard product={product} />
                                </div>
                            ))}
                        </div>

                        {/* Search Tips */}
                        <div className="mt-12 p-6 bg-white rounded-2xl border border-neutral-200">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Search Tips</h3>
                            <ul className="space-y-2 text-neutral-600">
                                <li>• Try different keywords or synonyms</li>
                                <li>• Check your spelling</li>
                                <li>• Use more general terms (e.g., "nuts" instead of "cashews")</li>
                                <li>• Browse our categories for inspiration</li>
                            </ul>
                        </div>
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}