const { OK, BAD_REQUEST } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Product = require('../product.schema');

// @desc  Update product

// @route put /api/v0/products/business/:productId
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const {
    categoryId,
    branchId,
    image,
    gallery,
    name,
    price,
    description,
    currency,
    sale,
    isSaleActive,
    stock,
    isActive
  } = req.body;
  const { _id, businessId } = req.user;

  const product = await Product.findOneAndUpdate(
    { _id: productId, businessId },
    {
      $set: {
        categoryId,
        branchId,
        image,
        gallery,
        name,
        price,
        description,
        currency,
        sale,
        isSaleActive,
        stock,
        isActive,
        updatedBy: _id
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
