const mongoose = require('mongoose');

const { Schema } = mongoose;

const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Please add a branch name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  address: {
    type: {
      addressLine: { type: String, trim: true },
      district: { type: String, trim: true },
      country: { type: String, trim: true },
      province: { type: String, trim: true }
    },
    required: [true, 'Please add a branch address']
  },
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  managerId: { type: Schema.Types.ObjectId, ref: 'User' },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Branch', BranchSchema);
