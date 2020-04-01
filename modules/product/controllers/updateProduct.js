const { OK, BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../../branch/branch.schema');
const Product = require('../product.schema');

// @desc  Update product

// @route put /api/v0/products/:productId
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const {  productId } = req.params;
  const {
    categoryId,
    image,
    gallery,
    name,
    price,
    description,
    currency,
    sale,
    stock
  } = req.body;
//   const branch = await Branch.findOne({
//     _id: branchId,
//     businessAdmin: req.user._id
//   }).lean();

//   if (!branch) {
//     return next(
//       new ErrorResponse(
//         'User is not authorized to perform this action',
//         UNAUTHORIZED
//       )
//     );
//   }
  const product = await Product.findOneAndUpdate(
    { _id: productId },
    {
      $set: {
      product:req.body
      }
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    return next(
      new ErrorResponse('Product not found for this user', BAD_REQUEST)
    );
  }

  return res.status(OK).json({
    
    status: true,
    message: 'Product Updated successfully',
    data: null
  });
});
