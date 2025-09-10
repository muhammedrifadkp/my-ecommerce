// backend/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample products data
const products = [
  // Premium Dry Fruits
  {
    name: 'Premium Dried Apricots',
    category: 'premium-dry-fruits',
    price: '120',
    quantityUnit: '250g',
    description: 'Sweet and tangy dried apricots, perfect for snacking or baking',
    image: 'https://images.unsplash.com/photo-1596567836640-3c13eb102106?q=80&w=500'
  },
  {
    name: 'Golden Raisins',
    category: 'premium-dry-fruits',
    price: '90',
    quantityUnit: '250g',
    description: 'Plump and juicy golden raisins with a natural sweetness',
    image: 'https://images.unsplash.com/photo-1596567836640-3c13eb102106?q=80&w=500'
  },
  {
    name: 'Dried Cranberries',
    category: 'premium-dry-fruits',
    price: '150',
    quantityUnit: '200g',
    description: 'Tangy and sweet dried cranberries, perfect for salads and baking',
    image: 'https://images.unsplash.com/photo-1596567836640-3c13eb102106?q=80&w=500'
  },
  {
    name: 'Dried Blueberries',
    category: 'premium-dry-fruits',
    price: '180',
    quantityUnit: '150g',
    description: 'Premium quality dried blueberries packed with antioxidants',
    image: 'https://images.unsplash.com/photo-1596567836640-3c13eb102106?q=80&w=500'
  },

  // Nuts & Seeds
  {
    name: 'Premium Almonds',
    category: 'nuts-seeds',
    price: '350',
    quantityUnit: '500g',
    description: 'Premium quality almonds, rich in healthy fats and protein',
    image: 'https://images.unsplash.com/photo-1574570301597-a4e0c3e3d6d2?q=80&w=500'
  },
  {
    name: 'Cashews',
    category: 'nuts-seeds',
    price: '380',
    quantityUnit: '500g',
    description: 'Crunchy cashews, perfect for snacking and cooking',
    image: 'https://images.unsplash.com/photo-1574570301597-a4e0c3e3d6d2?q=80&w=500'
  },
  {
    name: 'Pistachios',
    category: 'nuts-seeds',
    price: '420',
    quantityUnit: '400g',
    description: 'Premium pistachios, rich in antioxidants and heart-healthy fats',
    image: 'https://images.unsplash.com/photo-1574570301597-a4e0c3e3d6d2?q=80&w=500'
  },
  {
    name: 'Chia Seeds',
    category: 'nuts-seeds',
    price: '180',
    quantityUnit: '250g',
    description: 'Organic chia seeds, packed with omega-3 fatty acids and fiber',
    image: 'https://images.unsplash.com/photo-1574570301597-a4e0c3e3d6d2?q=80&w=500'
  },

  // Dates & Exotic Items
  {
    name: 'Medjool Dates',
    category: 'dates-exotic',
    price: '280',
    quantityUnit: '250g',
    description: 'Premium Medjool dates, known as the king of dates for their exceptional sweetness',
    image: 'https://images.unsplash.com/photo-1593999419634-4c91b29b4aea?q=80&w=500'
  },
  {
    name: 'Ajwa Dates',
    category: 'dates-exotic',
    price: '350',
    quantityUnit: '200g',
    description: 'Rare Ajwa dates from Madinah, prized for their unique flavor and health benefits',
    image: 'https://images.unsplash.com/photo-1593999419634-4c91b29b4aea?q=80&w=500'
  }
];

// Seed function
const seedDB = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Products collection cleared');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDB();
