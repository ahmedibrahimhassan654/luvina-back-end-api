/* eslint-disable no-unused-vars */
const { OK } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');

// @desc      User social login
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  // Create User
  const user = await User.findById(req.user_id);
  const data = user.toAuthJSON();

  return res.status(OK).json({
    status: true,
    message: 'User logged in successfully',
    data
  });
});
