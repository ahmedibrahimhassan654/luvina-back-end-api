const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    title: { type: String },
    description: { type: String },
    rating: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
