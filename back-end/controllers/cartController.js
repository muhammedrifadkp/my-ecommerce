// backend/controllers/cartController.js
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cartItem = await CartItem.findOne({ product: productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({ product: productId, quantity });
    }
    
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('product');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};