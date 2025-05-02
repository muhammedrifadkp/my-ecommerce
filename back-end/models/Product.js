// backend\models\Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: String,
  quantityUnit: String,
  description: String,
  image: String
});

export default mongoose.model('Product', productSchema);
