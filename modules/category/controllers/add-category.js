const { CREATED } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const Category = require('../category.schema');

// @desc      Customer signup
// @route     POST /api/v0/categories
// @access    Public
module.exports = asyncHandler(async (req, res) => {
  const { name, description, image, icon } = req.body;

  // Create category
  await Category.create({
    name,
    description,
    image,
    icon
  });

  return res.status(CREATED).json({
    status: true,
    message: 'Category created successfully',
    data: null
  });
});
