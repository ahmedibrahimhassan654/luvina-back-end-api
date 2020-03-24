/* eslint-disable no-unused-vars */
const { CREATED } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const { ROLE_CUSTOMER } = require('../../user/enum/roles');

// @desc      Register customer
// @route     POST /api/v0/auth/register
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { fullName, phoneNumber, userName, email, password, photo } = req.body;

  // Create User
  const user = await User.create({
    fullName,
    phoneNumber,
    userName,
    email,
    password,
    photo,
    roles: [ROLE_CUSTOMER]
  });

  return res
    .status(CREATED)
    .json({ status: true, message: 'User Created', data: null });
});
