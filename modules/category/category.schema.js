const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please add category name']
    },
    description: { type: String, trim: true },
    image: { type: String, default: 'no-photo.jpg' },
    icon: { type: String, default: 'no-photo.jpg' },
    isActive: { type: Boolean, default: true },
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

CategorySchema.plugin(require('mongoose-autopopulate'));

CategorySchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});
const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
