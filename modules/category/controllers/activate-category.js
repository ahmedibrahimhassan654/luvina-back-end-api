/* eslint-disable no-unused-vars */
const { OK, NO_CONTENT } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Category = require('../category.schema');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Activate category
// @route     PUT /api/v0/products/{id}/activate
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { isActive } = req.body;
  const { id } = req.params;

  // Create Customer
  const category = await Category.findByIdAndUpdate(
    id,
    {
      isActive,
      updatedBy: req.user._id
    },
    { runValidators: true, new: true }
  );

  if (!category) {
    return next(new ErrorResponse('Category not found', NO_CONTENT));
  }

  return res.status(OK).json({
    status: true,
    message: 'Done successfully',
    data: null
  });
});
