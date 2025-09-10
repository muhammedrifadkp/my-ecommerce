'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'premium-dry-fruits', // Default category
    price: '',
    quantityUnit: 'g',
    description: '',
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If product is provided, populate the form (for editing)
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'premium-dry-fruits',
        price: product.price || '',
        quantityUnit: product.quantityUnit || 'g',
        description: product.description || '',
        image: product.image || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      // Reset form after successful submission if it's a new product
      if (!product) {
        setFormData({
          name: '',
          category: 'premium-dry-fruits',
          price: '',
          quantityUnit: 'g',
          description: '',
          image: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="premium-dry-fruits">Premium Dry Fruits</option>
            <option value="nuts-seeds">Nuts & Seeds</option>
            <option value="dates-exotic">Dates & Exotic</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="e.g. 100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="quantityUnit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              id="quantityUnit"
              name="quantityUnit"
              value={formData.quantityUnit}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="piece">piece</option>
              <option value="dozen">dozen</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          {formData.image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
              <div className="relative w-full h-40 bg-gray-100 rounded overflow-hidden">
                <Image
                  src={formData.image}
                  alt="Product preview"
                  fill
                  className="object-contain"
                  unoptimized={!formData.image.includes('unsplash.com')}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-gray-200 hidden"
                >
                  <span className="text-gray-500">Invalid image URL</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 border border-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              product ? 'Update Product' : 'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
