const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Category = require('../category.schema');

// @desc      Get category by id
// @route     GET /api/v0/categories/{id}
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const doc = await Category.findById(id)
    .select(
      '_id name description image icon isActive createdBy updatedBy createdAt updatedAt'
    )
    .lean({ autopopulate: true });

  return res.status(OK).json({
    success: true,
    message: 'Done successfully.',
    data: doc
  });
});
