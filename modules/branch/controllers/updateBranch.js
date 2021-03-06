const { OK, BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');

// @desc  Update branch
// @route put /api/v0/branches/:businessId/:branchId
// @route public
module.exports = asyncHandler(async (req, res, next) => {
  const { branchId, businessId } = req.params;
  const { name, address, managerId } = req.body;
  const business = await Business.findOne({
    _id: businessId,
    businessAdmin: req.user._id
  }).lean();

  if (!business) {
    return next(
      new ErrorResponse(
        'User is not authorized to perform this action',
        UNAUTHORIZED
      )
    );
  }
  const branch = await Branch.findOneAndUpdate(
    { _id: branchId, businessId },
    {
      $set: {
        name,
        address,
        managerId
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
