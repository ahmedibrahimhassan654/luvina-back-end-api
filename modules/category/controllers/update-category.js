const { OK, NO_CONTENT } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Category = require('../category.schema');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Update category by id
// @route     PUT /api/v0/categories/{id}
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const { name, description, image, icon, isActive } = req.body;

  const doc = await Category.findByIdAndUpdate(
    id,
    {
      name,
      description,
      image,
      icon,
      isActive,
      updatedBy: req.user._id
    },
    { new: true, runValidators: true, context: 'query' }
  );

  if (!doc) {
    return next(new ErrorResponse('Category not found', NO_CONTENT));
  }

  return res.status(OK).json({
    success: true,
    message: 'Done successfully.',
    data: null
  });
});
