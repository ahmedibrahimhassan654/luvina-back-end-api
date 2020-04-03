const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');
const User = require('../../user/user.schema');
const { ROLE_BRANCH_MANAGER } = require('../../user/enum/roles');

// @desc  Add branch
// @route POST /api/v0/branches/:businessId/branch
// @route Public

module.exports = asyncHandler(async (req, res, next) => {
  const { name, address, manager } = req.body;
  const { fullName, phoneNumber, email, password } = manager;
  const { businessId } = req.params;

  let branchId = null;
  let managerId = null;
  try {
    const newBranch = new Branch({ name, address, businessId });
    branchId = newBranch._id;
    const newManager = new User({
      fullName,
      phoneNumber,
      email,
      password,
      branchId,
      roles: [ROLE_BRANCH_MANAGER],
      businessId
    });
    managerId = newManager._id;
    newBranch.managerId = managerId;

    await newManager.save();
    await newBranch.save();

    const business = await Business.findOneAndUpdate(
      {
        _id: businessId,
        businessAdmin: req.user._id
      },
      {
        $addToSet: { managers: managerId, branches: branchId }
      }
    );
    if (!business) {
      throw new ErrorResponse('Business Not found', BAD_REQUEST);
    }

    return res.status(CREATED).json({
      status: true,
      message: 'branch Created successfully',
      data: null
    });
  } catch (err) {
    await User.findByIdAndDelete(managerId);
    await Branch.findByIdAndDelete(branchId);
    return next(
      new ErrorResponse(
        err.message,
        err.status || INTERNAL_SERVER_ERROR,
        err.stack
      )
    );
  }
});
