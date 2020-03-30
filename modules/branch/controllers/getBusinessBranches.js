const { OK, BAD_REQUEST } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');

// @desc  Get all business branches
// @route Get /api/v0/branches/business
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page || 1, 1);
  const limit = parseInt(req.query.limit || 25, 25);
  const business = await Business.findOne({
    businessAdmin: req.user._id
  })
    .select('_id')
    .lean();

  if (!business) {
    return next(new ErrorResponse('No Business found', BAD_REQUEST));
  }

  const [list, count] = await Promise.all([
    Branch.find({
      businessId: business._id
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-createdAt')
      .lean(),
    Branch.count({
      businessId: business._id
    })
  ]);

  if (!list.length) {
    return res.status(OK).json({
      success: false,
      message: 'Branches for user not exist',
      data: { count, page, pages: Math.ceil(count / limit), list }
    });
  }

  return res.status(OK).json({
    success: true,
    message: 'Branches for user found successfully.',
    data: { count, page, pages: Math.ceil(count / limit), list }
  });
});
