/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
const { CREATED, BAD_REQUEST } = require('http-status-codes');
const to = require('await-to-js').default;

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const Business = require('../../business/business.schema');
const Branch = require('../../branch/branch.schema');
const {
  ROLE_BUSINESS_ADMIN,
  ROLE_BRANCH_MANAGER
} = require('../../user/enum/roles');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Business Signup
// @route     POST /api/v0/auth/business/signup
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { businessAdmin, business, branches } = req.body;

  // Create Business admin
  const newAdmin = new User({
    ...businessAdmin,
    roles: [ROLE_BUSINESS_ADMIN]
  });

  // Create business
  const newBusiness = new Business({
    ...business
  });

  newAdmin.businessId = newBusiness._id;
  newBusiness.businessAdmin = newAdmin._id;

  const branchesIds = [];
  const managersIds = [];
  for (const branch of branches) {
    const { name, address, manager } = branch;
    const newBranch = new Branch({ name, address });
    branchesIds.push(newBranch._id);
    const newManager = new User({
      ...manager,
      branchId: newBranch._id,
      businessId: newBusiness._id,
      roles: [ROLE_BRANCH_MANAGER]
    });
    managersIds.push(newManager._id);
    newBranch.managerId = newManager._id;
    newBranch.businessId = newBusiness._id;
    const [err, result] = await to(
      Promise.all([newBranch.save(), newManager.save()])
    );
    if (err) {
      if (branchesIds.length) {
        for (const bId of branchesIds) {
          await Branch.findByIdAndDelete(bId);
        }
      }
      if (managersIds.length) {
        for (const mId of managersIds) {
          await User.findByIdAndDelete(mId);
        }
      }
      return next(new ErrorResponse(err.message, BAD_REQUEST, err.stack));
    }
  }

  newBusiness.branches = branchesIds;
  newBusiness.managers = managersIds;

  const [err, result] = await to(
    Promise.all([newAdmin.save(), newBusiness.save()])
  );
  if (err) {
    await User.findByIdAndDelete(newAdmin._id);
    await Business.findByIdAndDelete(newBusiness._id);
    if (branchesIds.length) {
      for (const bId of branchesIds) {
        await Branch.findByIdAndDelete(bId);
      }
    }
    if (managersIds.length) {
      for (const mId of managersIds) {
        await User.findByIdAndDelete(mId);
      }
    }
    return next(new ErrorResponse(err.message, BAD_REQUEST, err.stack));
  }

  return res.status(CREATED).json({
    status: true,
    message: 'Business Created successfully',
    data: null
  });
});
