const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Product = require('../product.schema');

// @desc      Get category by id
// @route     GET /api/v0/products/{id}
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doc = await Product.findById(id)
    .select(
      '_id categoryId branchId image gallery name price description currency sale isSaleActive stock'
    )
    .lean({ autopopulate: true });

  return res.status(OK).json({
    success: true,
    message: 'Done successfully.',
    data: doc
  });
});
