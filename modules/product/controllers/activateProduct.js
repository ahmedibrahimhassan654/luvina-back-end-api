const { OK, NO_CONTENT } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Product = require('../product.schema');

// @desc  Activate product
// @route put /api/v0/products/business/:productId/activate
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const { isActive } = req.body;
  const { id } = req.params;
  const { _id, businessId } = req.user;

  const product = await Product.findOneAndUpdate(
    { _id: id, businessId },
    {
      isActive,
      updatedBy: _id
    },
    { runValidators: true, new: true }
  );

  if (!product) {
    return next(new ErrorResponse('Product not found', NO_CONTENT));
  }

  return res.status(OK).json({
    status: true,
    message: 'Done successfully',
    data: null
  });
});
