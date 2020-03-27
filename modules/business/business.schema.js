const mongoose = require('mongoose');

const { Schema } = mongoose;

const businessType = require('./enum/businessType');
const deliveryType = require('./enum/deliveryType');
const salesType = require('./enum/salesType');

const BusinessSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: [true, 'Please add business name']
    },
    address: {
      type: {
        addressLine: { type: String, trim: true },
        district: { type: String, trim: true },
        country: { type: String, trim: true },
        province: { type: String, trim: true }
      }
    },
    salesAddresses: {
      type: [
        {
          addressLine: { type: String, trim: true },
          district: { type: String, trim: true },
          country: { type: String, trim: true },
          province: { type: String, trim: true }
        }
      ]
    },
    businessType: {
      type: [Number],
      enum: Object.values(businessType),
      required: true
    },
    deliveryType: {
      type: [Number],
      enum: Object.values(deliveryType),
      default: [deliveryType.SELLER]
    },
    saleType: {
      type: Number,
      enum: Object.values(salesType),
      default: salesType.ONE_PLACE
    },
    businessAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
    branches: { type: [{ type: Schema.Types.ObjectId, ref: 'Branch' }] },
    managers: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }] }
  },
  {
    timestamps: true
  }
);

const Business = mongoose.model('Business', BusinessSchema);
module.exports = Business;
