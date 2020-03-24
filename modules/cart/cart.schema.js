const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    total: { type: Number, default: 0 },
    items: [
      {
        item: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number, default: 0 }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
