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
  // Vegetables
  {
    name: 'Fresh Tomatoes',
    category: 'vegetables',
    price: '80',
    quantityUnit: '1kg',
    description: 'Ripe, juicy tomatoes freshly harvested from local farms',
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=500'
  },
  {
    name: 'Spinach',
    category: 'vegetables',
    price: '40',
    quantityUnit: '500g',
    description: 'Organic spinach leaves, rich in iron and vitamins',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=500'
  },
  {
    name: 'Carrots',
    category: 'vegetables',
    price: '60',
    quantityUnit: '1kg',
    description: 'Sweet and crunchy carrots, perfect for salads and cooking',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=500'
  },
  {
    name: 'Bell Peppers',
    category: 'vegetables',
    price: '120',
    quantityUnit: '500g',
    description: 'Colorful bell peppers, great for stir-fries and salads',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=500'
  },

  // Fruits
  {
    name: 'Apples',
    category: 'fruits',
    price: '150',
    quantityUnit: '1kg',
    description: 'Crisp and sweet apples, perfect for snacking',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=500'
  },
  {
    name: 'Bananas',
    category: 'fruits',
    price: '70',
    quantityUnit: '1kg',
    description: 'Ripe bananas, rich in potassium and natural sweetness',
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=500'
  },
  {
    name: 'Oranges',
    category: 'fruits',
    price: '120',
    quantityUnit: '1kg',
    description: 'Juicy oranges, packed with vitamin C',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=500'
  },
  {
    name: 'Strawberries',
    category: 'fruits',
    price: '180',
    quantityUnit: '500g',
    description: 'Sweet and fragrant strawberries, freshly picked',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=500'
  },

  // Meat
  {
    name: 'Chicken Breast',
    category: 'meat',
    price: '250',
    quantityUnit: '500g',
    description: 'Boneless chicken breast, high in protein and low in fat',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=500'
  },
  {
    name: 'Ground Beef',
    category: 'meat',
    price: '300',
    quantityUnit: '500g',
    description: 'Premium ground beef, perfect for burgers and meatballs',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=500'
  },
  {
    name: 'Fish Fillet',
    category: 'meat',
    price: '350',
    quantityUnit: '500g',
    description: 'Fresh fish fillet, rich in omega-3 fatty acids',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500'
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
