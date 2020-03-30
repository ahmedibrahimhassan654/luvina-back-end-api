const { OK, BAD_REQUEST } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');

// @desc  Activate branch
// @route put /api/v0/branches/activate/:branchId
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const { branchId } = req.params;
  const { isActive } = req.body;

  const business = await Business.findOne({
    businessAdmin: req.user._id
  })
    .select('_id')
    .lean();

  const branch = await Branch.findOneAndUpdate(
    { _id: branchId, businessId: business._id },
    {
      $set: {
        isActive
      }
    },
    { new: true, runValidators: true }
  );

  if (!branch) {
    return next(
      new ErrorResponse('Branch not found for this user', BAD_REQUEST)
    );
  }

  return res.status(OK).json({
    status: true,
    message: 'Branch Updated successfully',
    data: null
  });
});
