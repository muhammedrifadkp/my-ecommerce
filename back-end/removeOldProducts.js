// backend/removeOldProducts.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for cleaning up old products'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Categories to keep
const validCategories = [
  'premium-dry-fruits',
  'nuts-seeds',
  'dates-exotic'
];

// Function to remove old product categories
const removeOldProducts = async () => {
  try {
    console.log('Starting removal of old product categories...');

    // Find products with categories not in the valid list
    const oldProducts = await Product.find({
      category: { $nin: validCategories }
    });

    console.log(`Found ${oldProducts.length} products with old categories to remove`);

    if (oldProducts.length > 0) {
      // Log the categories being removed
      const categoriesToRemove = [...new Set(oldProducts.map(p => p.category))];
      console.log('Categories being removed:', categoriesToRemove);

      // Delete the products
      const result = await Product.deleteMany({
        category: { $nin: validCategories }
      });

      console.log(`Deleted ${result.deletedCount} products with old categories`);
    } else {
      console.log('No old category products found to remove');
    }

    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB disconnected');
    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error removing old products:', error);
    process.exit(1);
  }
};

// Run the removal function
removeOldProducts();