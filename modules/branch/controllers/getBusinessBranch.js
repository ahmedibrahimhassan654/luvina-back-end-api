const { OK, BAD_REQUEST } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');

// @desc  Get business branch
// @route Get /api/v0/branches/business/:branchId
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const { branchId } = req.params;
  const business = await Business.findOne({
    businessAdmin: req.user._id
  })
    .select('_id')
    .lean();

  if (!business) {
    return next(new ErrorResponse('No Business found', BAD_REQUEST));
  }

  const branch = await Branch.findOne({
    _id: branchId,
    businessId: business._id
  }).lean();

  return res.status(OK).json({
    success: true,
    message: 'Branch found successfully.',
    data: branch
  });
});
