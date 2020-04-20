/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');

// @desc      Remove product from cart
// @route     DELETE /api/v0/cart/{productId}
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const { _id, cart } = req.user;
  const { productId } = req.params;

  cart.items = cart.items.filter((x) => x.item !== productId);
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
    message: 'Product removed from cart successfully',
    data: null
  });
});
