const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    businessId:{type: Schema.Types.ObjectId, ref: 'Business'},
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    image: { type: String },
    gallery: [{ type: String }],
    name: {
      type: String,
      required: true,
      minlength: 8,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'EGP'],
      default: 'EGP'
    },
    sale: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 100
    },
    stock: {
      type: Number,
      required: false,
      default: 1,
      min: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

ProductSchema.virtual('averageRating').get(function() {
  let rating = 0;
  if (this.reviews.length === 0) {
    rating = 0;
  } else {
    this.reviews.map((review) => {
      rating += review.rating;
    });
    rating /= this.reviews.length;
  }
  return rating;
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
