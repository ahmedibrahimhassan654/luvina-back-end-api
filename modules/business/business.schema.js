const mongoose = require('mongoose');

const { Schema } = mongoose;

const BusinessSchema = new Schema(
  {},
  {
    timestamps: true
  }
);

const Business = mongoose.model('Business', BusinessSchema);
module.exports = Business;
