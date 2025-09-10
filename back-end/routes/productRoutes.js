// backend\routes\productRoutes.js
import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();

// Get all products with optional search query
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // If search query is provided, filter products
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i'); // Case-insensitive search
      query = {
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
          { category: { $regex: searchRegex } }
        ]
      };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products by category
router.get('/:category', async (req, res) => {
  try {
    // Check if the request is for a specific product by ID
    if (req.params.category.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await Product.findById(req.params.category);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(product);
    }

    // Otherwise, get products by category
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, category, price, quantityUnit, description, image } = req.body;

    // Validate required fields
    if (!name || !category || !price) {
      return res.status(400).json({ error: 'Please provide name, category, and price' });
    }

    const newProduct = new Product({
      name,
      category,
      price,
      quantityUnit: quantityUnit || 'kg',
      description: description || '',
      image: image || ''
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, quantityUnit, description, image } = req.body;

    // Find product by ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product fields
    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = price;
    if (quantityUnit) product.quantityUnit = quantityUnit;
    if (description !== undefined) product.description = description;
    if (image !== undefined) product.image = image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dedicated search endpoint for better performance
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters long' });
    }

    const searchRegex = new RegExp(query.trim(), 'i');
    const searchQuery = {
      $or: [
        { name: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { category: { $regex: searchRegex } }
      ]
    };

    const products = await Product.find(searchQuery);

    res.json({
      query: query.trim(),
      results: products,
      count: products.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
