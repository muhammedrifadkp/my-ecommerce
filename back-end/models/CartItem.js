// backend/models/CartItem.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number
});

export default mongoose.model('CartItem', cartItemSchema);