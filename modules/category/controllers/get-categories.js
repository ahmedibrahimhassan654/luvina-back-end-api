const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Category = require('../category.schema');

// @desc      List all categories
// @route     GET /api/v0/categories
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 1) || 1;
  const limit = parseInt(req.query.limit, 1) || 25;

  const [list, count] = await Promise.all([
    Category.find({})
      .select(
        '_id name description image icon isActive createdBy updatedBy createdAt updatedAt'
      )
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt')
      .lean({ autopopulate: true }),
    Category.count({})
  ]);

  return res.status(OK).json({
    success: true,
    message: 'Done successfully.',
    data: { count, limit, page, pages: Math.ceil(count || 0 / limit), list }
  });
});
