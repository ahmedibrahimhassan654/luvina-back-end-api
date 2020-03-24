const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    totalPrice: { type: Number, default: 0 },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
