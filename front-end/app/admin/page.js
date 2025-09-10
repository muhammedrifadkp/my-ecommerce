'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiHome, FiPackage, FiSettings, FiLogOut, FiPlus, FiEdit3, FiTrash2,
  FiSearch, FiFilter, FiGrid, FiList, FiActivity, FiTrendingUp,
  FiUsers, FiShoppingBag, FiDollarSign, FiStar, FiEye, FiMenu, FiX
} from 'react-icons/fi';
import ProductPopup from '../components/ProductPopup';
import DeleteProductConfirmationPopup from '../components/DeleteProductConfirmationPopup';
import LogoutConfirmationPopup from '../components/LogoutConfirmationPopup';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminDashboard() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({
    'premium-dry-fruits': [],
    'nuts-seeds': [],
    'dates-exotic': []
  });
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  // First useEffect just to handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Second useEffect for authentication logic - only runs on the client
  useEffect(() => {
    if (!mounted) return;

    // Check if admin is logged in using the simplified approach
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    const adminUsername = localStorage.getItem('adminUsername');

    if (!isAdminLoggedIn || !adminUsername) {
      router.push('/admin/login');
      return;
    }

    // Set admin info
    setAdminInfo({ username: adminUsername });

    // Fetch products directly without JWT verification
    fetchProducts();
    setLoading(false);

  }, [mounted, router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

      // Store all products
      setProducts(data);

      // Group products by category
      const grouped = {
        'premium-dry-fruits': data.filter(product => product.category === 'premium-dry-fruits'),
        'nuts-seeds': data.filter(product => product.category === 'nuts-seeds'),
        'dates-exotic': data.filter(product => product.category === 'dates-exotic')
      };

      setGroupedProducts(grouped);
    } catch (error) {
      setError('Failed to load products');
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }

      // Refresh the product list
      fetchProducts();

      // Hide the form
      setShowAddForm(false);

      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
      }

      // Refresh the product list
      fetchProducts();

      // Reset editing state
      setEditingProduct(null);

      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const handleDeleteProduct = (product) => {
    // Set the product to delete, which will show the confirmation popup
    setProductToDelete(product);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete product');
      }

      // Refresh the product list
      fetchProducts();

      // Close the confirmation popup
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product');

      // Close the confirmation popup even if there's an error
      setProductToDelete(null);
    }
  };

  const handleLogout = () => {
    // Show the logout confirmation popup
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    // Clear admin info from localStorage
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');

    // Redirect to login page
    router.push('/admin/login');
  };

  const cancelLogout = () => {
    // Hide the logout confirmation popup
    setShowLogoutConfirmation(false);
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalCategories = Object.keys(groupedProducts).length;
  const totalValue = products.reduce((sum, product) => sum + (parseFloat(product.price) || 0), 0);
  const averagePrice = totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : 0;

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show loading state if not mounted yet or still loading
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <LoadingSpinner size="xl" text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-lg max-w-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:flex-shrink-0
      `}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Admin</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <FiHome className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${activeTab === 'products'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <FiPackage className="w-5 h-5 mr-3" />
              Products
              <span className="ml-auto bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                {totalProducts}
              </span>
            </button>
            <Link
              href="/"
              className="w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <FiEye className="w-5 h-5 mr-3" />
              View Store
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {adminInfo?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{adminInfo?.username}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              suppressHydrationWarning
            >
              <FiLogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <h1 className="ml-2 lg:ml-0 text-2xl font-bold text-gray-900">
                {activeTab === 'dashboard' ? 'Dashboard Overview' : 'Product Management'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {activeTab === 'products' && (
                <>
                  {/* Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {/* Add Product Button */}
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                    suppressHydrationWarning
                  >
                    <FiPlus className="w-4 h-4 mr-2" />
                    Add Product
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="h-full overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Products */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <FiPackage className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Total Products</p>
                          <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-green-600">
                          <FiTrendingUp className="w-4 h-4 mr-1" />
                          <span>Active inventory</span>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <FiGrid className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Categories</p>
                          <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-blue-600">
                          <FiActivity className="w-4 h-4 mr-1" />
                          <span>Product types</span>
                        </div>
                      </div>
                    </div>

                    {/* Average Price */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                            <FiDollarSign className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                          <p className="text-2xl font-bold text-gray-900">AED {averagePrice}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-emerald-600">
                          <FiTrendingUp className="w-4 h-4 mr-1" />
                          <span>Per product</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Value */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                            <FiShoppingBag className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">Total Value</p>
                          <p className="text-2xl font-bold text-gray-900">AED {totalValue.toFixed(0)}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-orange-600">
                          <FiActivity className="w-4 h-4 mr-1" />
                          <span>Inventory worth</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">🍇</span>
                            <div>
                              <p className="font-medium text-gray-900">Premium Dry Fruits</p>
                              <p className="text-sm text-gray-600">{groupedProducts['premium-dry-fruits'].length} products</p>
                            </div>
                          </div>
                          <div className="w-16 h-2 bg-purple-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                              style={{ width: `${totalProducts > 0 ? (groupedProducts['premium-dry-fruits'].length / totalProducts) * 100 : 0}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">🥜</span>
                            <div>
                              <p className="font-medium text-gray-900">Nuts & Seeds</p>
                              <p className="text-sm text-gray-600">{groupedProducts['nuts-seeds'].length} products</p>
                            </div>
                          </div>
                          <div className="w-16 h-2 bg-amber-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                              style={{ width: `${totalProducts > 0 ? (groupedProducts['nuts-seeds'].length / totalProducts) * 100 : 0}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">🌴</span>
                            <div>
                              <p className="font-medium text-gray-900">Dates & Exotic</p>
                              <p className="text-sm text-gray-600">{groupedProducts['dates-exotic'].length} products</p>
                            </div>
                          </div>
                          <div className="w-16 h-2 bg-emerald-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                              style={{ width: `${totalProducts > 0 ? (groupedProducts['dates-exotic'].length / totalProducts) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            setActiveTab('products');
                            setShowAddForm(true);
                          }}
                          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <FiPlus className="w-5 h-5 text-purple-600 mr-3" />
                            <span className="font-medium text-gray-900">Add New Product</span>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <button
                          onClick={() => setActiveTab('products')}
                          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <FiPackage className="w-5 h-5 text-blue-600 mr-3" />
                            <span className="font-medium text-gray-900">Manage Products</span>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        <Link
                          href="/"
                          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <FiEye className="w-5 h-5 text-emerald-600 mr-3" />
                            <span className="font-medium text-gray-900">View Store</span>
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  {/* Product Management Header */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {filteredProducts.length} of {totalProducts} products
                          {searchTerm && ` matching "${searchTerm}"`}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                                ? 'bg-white shadow-sm text-purple-600'
                                : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            <FiGrid className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                ? 'bg-white shadow-sm text-purple-600'
                                : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            <FiList className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Sort Dropdown */}
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="block px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="name">Sort by Name</option>
                          <option value="price">Sort by Price</option>
                          <option value="category">Sort by Category</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Product Categories */}
                  <div className="space-y-6">
                    {/* Premium Dry Fruits */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">🍇</span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Premium Dry Fruits</h3>
                              <p className="text-sm text-gray-600">{groupedProducts['premium-dry-fruits'].length} products</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {groupedProducts['premium-dry-fruits'].length > 0 ? (
                          viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {groupedProducts['premium-dry-fruits']
                                .filter(product =>
                                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .sort((a, b) => {
                                  if (sortBy === 'name') return a.name.localeCompare(b.name);
                                  if (sortBy === 'price') return parseFloat(a.price) - parseFloat(b.price);
                                  return 0;
                                })
                                .map((product) => (
                                  <div key={product._id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                                      {product.image ? (
                                        <Image
                                          src={product.image}
                                          alt={product.name}
                                          width={150}
                                          height={150}
                                          className="w-full h-full object-cover"
                                          unoptimized={!product.image.includes('unsplash.com')}
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <span className="text-gray-400 text-sm">No image</span>
                                        </div>
                                      )}
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                                    <p className="text-lg font-bold text-purple-600 mb-3">AED {product.price}</p>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => setEditingProduct(product)}
                                        className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                        suppressHydrationWarning
                                      >
                                        <FiEdit3 className="w-4 h-4 mr-1" />
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDeleteProduct(product)}
                                        className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        suppressHydrationWarning
                                      >
                                        <FiTrash2 className="w-4 h-4 mr-1" />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {groupedProducts['premium-dry-fruits']
                                    .filter(product =>
                                      product.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => {
                                      if (sortBy === 'name') return a.name.localeCompare(b.name);
                                      if (sortBy === 'price') return parseFloat(a.price) - parseFloat(b.price);
                                      return 0;
                                    })
                                    .map((product) => (
                                      <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                              {product.image ? (
                                                <Image
                                                  src={product.image}
                                                  alt={product.name}
                                                  width={48}
                                                  height={48}
                                                  className="rounded-lg object-cover"
                                                  unoptimized={!product.image.includes('unsplash.com')}
                                                />
                                              ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                  <span className="text-xs text-gray-400">No image</span>
                                                </div>
                                              )}
                                            </div>
                                            <div className="ml-4">
                                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                              <div className="text-sm text-gray-500">Premium Dry Fruits</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm font-bold text-purple-600">AED {product.price}</div>
                                          <div className="text-sm text-gray-500">per {product.quantityUnit}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={() => setEditingProduct(product)}
                                              className="text-blue-600 hover:text-blue-900 transition-colors"
                                              suppressHydrationWarning
                                            >
                                              Edit
                                            </button>
                                            <button
                                              onClick={() => handleDeleteProduct(product)}
                                              className="text-red-600 hover:text-red-900 transition-colors"
                                              suppressHydrationWarning
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        ) : (
                          <div className="text-center py-12">
                            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No premium dry fruits</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Nuts & Seeds */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">🥜</span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Nuts & Seeds</h3>
                              <p className="text-sm text-gray-600">{groupedProducts['nuts-seeds'].length} products</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {groupedProducts['nuts-seeds'].length > 0 ? (
                          viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {groupedProducts['nuts-seeds']
                                .filter(product =>
                                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .sort((a, b) => {
                                  if (sortBy === 'name') return a.name.localeCompare(b.name);
                                  if (sortBy === 'price') return parseFloat(a.price) - parseFloat(b.price);
                                  return 0;
                                })
                                .map((product) => (
                                  <div key={product._id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                                      {product.image ? (
                                        <Image
                                          src={product.image}
                                          alt={product.name}
                                          width={150}
                                          height={150}
                                          className="w-full h-full object-cover"
                                          unoptimized={!product.image.includes('unsplash.com')}
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <span className="text-gray-400 text-sm">No image</span>
                                        </div>
                                      )}
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                                    <p className="text-lg font-bold text-amber-600 mb-3">AED {product.price}</p>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => setEditingProduct(product)}
                                        className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                        suppressHydrationWarning
                                      >
                                        <FiEdit3 className="w-4 h-4 mr-1" />
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDeleteProduct(product)}
                                        className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        suppressHydrationWarning
                                      >
                                        <FiTrash2 className="w-4 h-4 mr-1" />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {groupedProducts['nuts-seeds']
                                    .filter(product =>
                                      product.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => {
                                      if (sortBy === 'name') return a.name.localeCompare(b.name);
                                      if (sortBy === 'price') return parseFloat(a.price) - parseFloat(b.price);
                                      return 0;
                                    })
                                    .map((product) => (
                                      <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                              {product.image ? (
                                                <Image
                                                  src={product.image}
                                                  alt={product.name}
                                                  width={48}
                                                  height={48}
                                                  className="rounded-lg object-cover"
                                                  unoptimized={!product.image.includes('unsplash.com')}
                                                />
                                              ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                  <span className="text-xs text-gray-400">No image</span>
                                                </div>
                                              )}
                                            </div>
                                            <div className="ml-4">
                                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                              <div className="text-sm text-gray-500">Nuts & Seeds</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm font-bold text-amber-600">AED {product.price}</div>
                                          <div className="text-sm text-gray-500">per {product.quantityUnit}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={() => setEditingProduct(product)}
                                              className="text-blue-600 hover:text-blue-900 transition-colors"
                                              suppressHydrationWarning
                                            >
                                              Edit
                                            </button>
                                            <button
                                              onClick={() => handleDeleteProduct(product)}
                                              className="text-red-600 hover:text-red-900 transition-colors"
                                              suppressHydrationWarning
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        ) : (
                          <div className="text-center py-12">
                            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No nuts & seeds</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dates & Exotic */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">🌴</span>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">Dates & Exotic</h3>
                              <p className="text-sm text-gray-600">{groupedProducts['dates-exotic'].length} products</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {groupedProducts['dates-exotic'].length > 0 ? (
                          viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {groupedProducts['dates-exotic']
                                .filter(product =>
                                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .sort((a, b) => {
                                  if (sortBy === 'name') return a.name.localeCompare(b.name);
                                  if (sortBy === 'price') return parseFloat(a.price) - parseFloat(b.price);
                                  return 0;
                                })
                                .map((product) => (
                                  <div key={product._id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                                    <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                                      {product.image ? (
                                        <Image
                                          src={product.image}
                                          alt={product.name}
                                          width={150}
                                          height={150}
                                          className="w-full h-full object-cover"
                                          unoptimized={!product.image.includes('unsplash.com')}
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                          <span className="text-gray-400 text-sm">No image</span>
                                        </div>
                                      )}
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                                    <p className="text-lg font-bold text-emerald-600 mb-3">AED {product.price}</p>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => setEditingProduct(product)}
                                        className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                        suppressHydrationWarning
                                      >
                                        <FiEdit3 className="w-4 h-4 mr-1" />
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDeleteProduct(product)}
                                        className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        suppressHydrationWarning
                                      >
                                        <FiTrash2 className="w-4 h-4 mr-1" />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {groupedProducts['dates-exotic']
                                    .filter(product =>
                                      product.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => {
                                      if (sortBy === 'name') return a.name.localeCompare(b.name);
                                      if (sortBy === 'price') return parseFloat(a.price) - parseFloat(b.price);
                                      return 0;
                                    })
                                    .map((product) => (
                                      <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                              {product.image ? (
                                                <Image
                                                  src={product.image}
                                                  alt={product.name}
                                                  width={48}
                                                  height={48}
                                                  className="rounded-lg object-cover"
                                                  unoptimized={!product.image.includes('unsplash.com')}
                                                />
                                              ) : (
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                  <span className="text-xs text-gray-400">No image</span>
                                                </div>
                                              )}
                                            </div>
                                            <div className="ml-4">
                                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                              <div className="text-sm text-gray-500">Dates & Exotic</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                          <div className="text-sm font-bold text-emerald-600">AED {product.price}</div>
                                          <div className="text-sm text-gray-500">per {product.quantityUnit}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={() => setEditingProduct(product)}
                                              className="text-blue-600 hover:text-blue-900 transition-colors"
                                              suppressHydrationWarning
                                            >
                                              Edit
                                            </button>
                                            <button
                                              onClick={() => handleDeleteProduct(product)}
                                              className="text-red-600 hover:text-red-900 transition-colors"
                                              suppressHydrationWarning
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          )
                        ) : (
                          <div className="text-center py-12">
                            <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No dates & exotic products</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding a new product.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Product Popup */}
      {(showAddForm || editingProduct) && (
        <ProductPopup
          product={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onClose={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Delete Product Confirmation Popup */}
      {productToDelete && (
        <DeleteProductConfirmationPopup
          productName={productToDelete.name}
          onConfirm={confirmDeleteProduct}
          onCancel={() => setProductToDelete(null)}
        />
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && (
        <LogoutConfirmationPopup
          username={adminInfo?.username}
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
}
