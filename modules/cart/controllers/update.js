/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const { OK, BAD_REQUEST } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const Product = require('../../product/product.schema');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Update product in cart
// @route     PUT /api/v0/cart/{productId}
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { _id, cart } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;

  const product = await Product.findById(productId).lean();
  if (!product) {
    return next(new ErrorResponse('Product not found', BAD_REQUEST));
  }
  if (product.stock < quantity) {
    return next(
      new ErrorResponse('This product has no enough stock', BAD_REQUEST)
    );
  }

  const index = cart.items.findIndex((x) => x.item === productId);
  if (index === -1) {
    return next(
      new ErrorResponse('This product is not in the cart', BAD_REQUEST)
    );
  }
  const price = product.isDiscountActive
    ? product.price - product.price * (product.discount / 100)
    : product.price;
  cart.items[index].quantity = quantity;
  cart.items[index].price = +quantity * price;

  cart.total = cart.items.reduce((total, x) => {
    return (total += x.price);
  }, 0);

  await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        cart
      }
    },
    { new: true, runValidators: true }
  );
  return res.status(OK).json({
    status: true,
    message: 'Cart updated successfully',
    data: null
  });
});
