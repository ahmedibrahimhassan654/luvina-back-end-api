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

ProductSchema.virtual('averageRating').get(function() {
  let rating = 0;
  if (this.reviews.length == 0) {
    rating = 0;
  } else {
    this.reviews.map(review => {
      rating += review.rating;
    });
    rating /= this.reviews.length;
  }
  return rating;
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
