const { OK, UNAUTHORIZED } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      User login
// @route     POST /api/v0/auth/login
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  // Create User
  const user = await User.findOne({ userName }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Login failed', UNAUTHORIZED));
  }

  const isMatch = await user.validatePassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Login failed', UNAUTHORIZED));
  }

  const data = user.toAuthJSON();

  return res.status(OK).json({
    status: true,
    message: 'User logged in successfully',
    data
  });
});
