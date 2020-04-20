/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const { OK, BAD_REQUEST } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const Product = require('../../product/product.schema');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Add product to cart
// @route     POST /api/v0/cart/{productId}
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { _id, cart } = req.user;
  const { productId } = req.params;

  const product = await Product.findById(productId).lean();
  if (!product) {
    return next(new ErrorResponse('Product not found', BAD_REQUEST));
  }
  if (product.stock < 1) {
    return next(new ErrorResponse('This product has no stock', BAD_REQUEST));
  }

  const index = cart.items.findIndex((x) => x.item === productId);
  const price = product.isDiscountActive
    ? product.price - product.price * (product.discount / 100)
    : product.price;
  if (index === -1) {
    cart.items.push({ item: product._id, quantity: 1, price });
  } else {
    cart.items[index].quantity += 1;
    cart.items[index].price = +cart.items[index].quantity * price;
  }
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
    message: 'Product added to cart successfully',
    data: null
  });
});
