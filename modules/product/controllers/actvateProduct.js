const { OK, BAD_REQUEST } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../../branch/branch.schema');
const Product = require('../../product/product.schema');

// @desc  Activate product
// @route put /api/v0/products/:productId/activate
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { isActive, businessId } = req.body;


  const business = await Business.findOne({
    businessAdmin: req.user._id,
    businessId: business._id
  })
    .select('_id')
    .lean();

  const branch = await Branch.findOne({
    managerId: req.user._id
  })
    .select('_id')
    .lean();
  const product = await Product.findByIdAndUpdate(
    { _id: productId, branchId: branch._id, businessId: req.body.businessId },
    {
      $set: {
        isActive
      }
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    return next(
      new ErrorResponse('product not found for this user', BAD_REQUEST)
    );
  }

  return res.status(OK).json({
    status: true,
    message: 'product not active now',
    data: null
  });
});
