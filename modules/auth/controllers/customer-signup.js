/* eslint-disable no-unused-vars */
const { CREATED } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const { ROLE_CUSTOMER } = require('../../user/enum/roles');

// @desc      Register customer
// @route     POST /api/v0/auth/customer/signup
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const {
    fullName,
    phoneNumber,
    dateOfBirth,
    email,
    password,
    address
  } = req.body;

  // Create User
  const user = await User.create({
    fullName,
    phoneNumber,
    email,
    password,
    dateOfBirth,
    address,
    roles: [ROLE_CUSTOMER]
  });

  return res.status(CREATED).json({
    status: true,
    message: 'Customer Created successfully',
    data: null
  });
});
