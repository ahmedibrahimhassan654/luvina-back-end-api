const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    catName: { type: String, unique: true, trim: true, required: true },
    description: { type: String, trim: true, lowercase: true }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
