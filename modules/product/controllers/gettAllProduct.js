const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Product = require('../product.schema');

// @desc      List all products
// @route     GET /api/v0/products
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 1) || 1;
  const limit = parseInt(req.query.limit, 1) || 25;

  const [list, count] = await Promise.all([
    Product.find({})
      .select(
        '_id categoryId branchId image gallery name price description currency sale isSaleActive stock'
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt')
      .lean({ autopopulate: true }),
    Product.count({})
  ]);

  return res.status(OK).json({
    success: true,
    message: 'Done successfully.',
    data: { count, limit, page, pages: Math.ceil(count || 0 / limit), list }
  });
});
