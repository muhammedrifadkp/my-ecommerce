// backend\server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { protect, admin } from './middleware/authMiddleware.js';

dotenv.config();
const app = express();

// Configure CORS
const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN || 'https://my-ecommerce-black.vercel.app',
    'https://my-ecommerce-two-phi.vercel.app',
    'http://localhost:3000'  // Allow local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Test endpoint
app.get('/', (_, res) => {
  res.json({
    message: 'E-commerce API is running!',
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);

// Protected Admin Routes
app.use('/api/admin', protect, admin, (req, res) => {
  res.json({ message: 'Admin access granted', user: req.user });
});

mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb+srv://muhammedrifadkp3:merntest@tseepacademy.rxgap.mongodb.net/ecommerce')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
