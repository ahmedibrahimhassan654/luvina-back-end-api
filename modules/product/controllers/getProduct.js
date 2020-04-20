const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Product = require('../product.schema');

// @desc      Get product by id
// @route     GET /api/v0/products/{id}
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doc = await Product.findById(id)
    .select({
      _id: 1,
      categoryId: 1,
      branchId: 1,
      image: 1,
      gallery: 1,
      name: 1,
      price: 1,
      description: 1,
      currency: 1,
      sale: 1,
      isSaleActive: 1,
      stock: 1,
      createdBy: 1,
      updatedBy: 1
    })
    .lean({ autopopulate: true });

  return res.status(OK).json({
    success: true,
    message: 'Done successfully.',
    data: doc
  });
});
