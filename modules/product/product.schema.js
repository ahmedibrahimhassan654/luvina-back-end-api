const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    businessId: { type: Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    images: { type: String },
    title: { type: String },
    name: { type: String },
    price: { type: Number }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
