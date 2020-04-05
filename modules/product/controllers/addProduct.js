const { CREATED } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Product = require('../product.schema');

// @desc  Add product
// @route POST /api/v0/products/business
// @route Private

module.exports = asyncHandler(async (req, res) => {
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
    stock
  } = req.body;

  const { _id, businessId } = req.user;

  await Product.create({
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
    createdBy: _id,
    businessId
  });

  return res.status(CREATED).json({
    status: true,
    message: 'product Created successfully',
    data: null
  });
});
