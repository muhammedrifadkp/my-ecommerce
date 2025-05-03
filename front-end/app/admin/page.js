'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductPopup from '../components/ProductPopup';
import DeleteProductConfirmationPopup from '../components/DeleteProductConfirmationPopup';
import LogoutConfirmationPopup from '../components/LogoutConfirmationPopup';

export default function AdminDashboard() {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({
    vegetables: [],
    fruits: [],
    meat: []
  });
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

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
        vegetables: data.filter(product => product.category === 'vegetables'),
        fruits: data.filter(product => product.category === 'fruits'),
        meat: data.filter(product => product.category === 'meat')
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

  // Show loading state if not mounted yet or still loading
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {adminInfo?.username}</span>
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              suppressHydrationWarning
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
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

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Products</h2>
              {!showAddForm && !editingProduct && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                  suppressHydrationWarning
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Product
                </button>
              )}
            </div>

            <div className="space-y-8">
              {/* Vegetables Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 bg-green-50 p-2 rounded">Vegetables</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {groupedProducts.vegetables.length > 0 ? (
                        groupedProducts.vegetables.map((product) => (
                          <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                    className="rounded object-cover"
                                    unoptimized={!product.image.includes('unsplash.com')}
                                  />
                                ) : (
                                  <div className="w-[50px] h-[50px] bg-gray-200 rounded flex items-center justify-center">
                                    <span className="text-xs text-gray-400">No image</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">AED{product.price}/{product.quantityUnit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                suppressHydrationWarning
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product)}
                                className="text-red-600 hover:text-red-900"
                                suppressHydrationWarning
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            No vegetables found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fruits Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 bg-yellow-50 p-2 rounded">Fruits</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {groupedProducts.fruits.length > 0 ? (
                        groupedProducts.fruits.map((product) => (
                          <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                    className="rounded object-cover"
                                    unoptimized={!product.image.includes('unsplash.com')}
                                  />
                                ) : (
                                  <div className="w-[50px] h-[50px] bg-gray-200 rounded flex items-center justify-center">
                                    <span className="text-xs text-gray-400">No image</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">AED{product.price}/{product.quantityUnit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                suppressHydrationWarning
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product)}
                                className="text-red-600 hover:text-red-900"
                                suppressHydrationWarning
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            No fruits found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Meat Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 bg-red-50 p-2 rounded">Meat</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {groupedProducts.meat.length > 0 ? (
                        groupedProducts.meat.map((product) => (
                          <tr key={product._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                {product.image ? (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                    className="rounded object-cover"
                                    unoptimized={!product.image.includes('unsplash.com')}
                                  />
                                ) : (
                                  <div className="w-[50px] h-[50px] bg-gray-200 rounded flex items-center justify-center">
                                    <span className="text-xs text-gray-400">No image</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">AED{product.price}/{product.quantityUnit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                suppressHydrationWarning
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product)}
                                className="text-red-600 hover:text-red-900"
                                suppressHydrationWarning
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            No meat products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
