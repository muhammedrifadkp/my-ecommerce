// backend/controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch ? 'Yes' : 'No');

    // Check if user exists and password matches
    if (isMatch) {
      const token = generateToken(user._id);
      console.log('Login successful, token generated');

      res.json({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        token,
      });
    } else {
      console.log('Password does not match');
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Private/Admin
export const register = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      username,
      password,
      isAdmin,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create admin user if none exists
// @route   GET /api/auth/seed-admin
// @access  Public (but should be secured in production)
export const seedAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ isAdmin: true });

    if (adminExists) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    // Create admin user
    const admin = await User.create({
      username: 'rifadkp',
      password: 'rifadkp123',
      isAdmin: true,
    });

    if (admin) {
      res.status(201).json({
        message: 'Admin user created successfully',
        username: admin.username,
      });
    } else {
      res.status(400).json({ error: 'Failed to create admin user' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
