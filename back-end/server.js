// backend\server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { protect, admin } from './middleware/authMiddleware.js';
import KeepAliveService from './services/keepAlive.js';

dotenv.config();
const app = express();

// Configure CORS
const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN || 'https://al-mashhour.vercel.app',
    'http://localhost:3000'  // Allow local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Initialize Keep-Alive Service
let keepAliveService = null;

// Test endpoint
app.get('/', (_, res) => {
  res.json({
    message: 'E-commerce API is running!',
    status: 'online',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    keepAlive: keepAliveService ? keepAliveService.getStatus() : { enabled: false }
  });
});

// Health check endpoint for keep-alive pings
app.get('/health', (_, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Keep-alive status endpoint
app.get('/keep-alive/status', (_, res) => {
  if (keepAliveService) {
    res.json(keepAliveService.getStatus());
  } else {
    res.json({ enabled: false, message: 'Keep-alive service not initialized' });
  }
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
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);

  // Initialize keep-alive service in production
  if (process.env.NODE_ENV === 'production' || process.env.RENDER_SERVICE_NAME) {
    const serviceUrl = process.env.RENDER_EXTERNAL_URL || `https://${process.env.RENDER_SERVICE_NAME}.onrender.com` || `http://localhost:${PORT}`;

    console.log(`🔄 Initializing keep-alive service for: ${serviceUrl}`);
    keepAliveService = new KeepAliveService(`${serviceUrl}/health`, 14 * 60 * 1000); // 14 minutes
    keepAliveService.start();

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM received, shutting down gracefully');
      if (keepAliveService) {
        keepAliveService.stop();
      }
      process.exit(0);
    });

    process.on('SIGINT', () => {
      console.log('🛑 SIGINT received, shutting down gracefully');
      if (keepAliveService) {
        keepAliveService.stop();
      }
      process.exit(0);
    });
  } else {
    console.log('🔧 Keep-alive service disabled in development mode');
  }
});
