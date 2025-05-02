// backend/routes/authRoutes.js
import express from 'express';
import { login, register, seedAdmin } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.get('/seed-admin', seedAdmin);

// Protected routes
router.post('/register', protect, admin, register);

export default router;
