const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const currencyEnum = require('./enum/currency');

const ProductSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      autopopulate: { select: '_id name image icon', maxDepth: 1 },
      required: [true, 'Please add a category']
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      autopopulate: { select: '_id name', maxDepth: 1 },
      required: [true, 'Please add a business']
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      autopopulate: { select: '_id name', maxDepth: 1 },
      required: [true, 'Please add a branch']
    },
    // [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    image: { type: String },
    gallery: [{ type: String }],
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      min: [0, 'Price can not be less than 0']
    },
    description: {
      type: String,
      default: 'No Description',
      trim: true
    },
    currency: {
      type: String,
      enum: Object.values(currencyEnum),
      default: 'EGP'
    },
    sale: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
      max: 100
    },
    isSaleActive: { type: Boolean, default: false },
    stock: {
      type: Number,
      required: false,
      default: 1,
      min: [1, 'Stock can not be less than 1']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: 'User',
      autopopulate: { select: '_id firstName lastName', maxDepth: 1 }
    },
    updatedBy: {
      type: Schema.ObjectId,
      ref: 'User',
      autopopulate: { select: '_id firstName lastName', maxDepth: 1 }
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

ProductSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

ProductSchema.plugin(require('mongoose-autopopulate'));

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
