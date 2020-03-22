/* eslint-disable no-unused-vars */
const { OK, NO_CONTENT } = require('http-status-codes');
const crypto = require('crypto');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const generateExpirationDate = require('../../../common/helpers/generate-expiration-date');
const ErrorResponse = require('../../../common/utils/errorResponse');
const sendMail = require('../../../common/utils/sendMail');
const config = require('../../../common/config/config');

// @desc      Reset password
// @route     PUT /api/v0/auth/reset-password/{token}
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Token not found or invalid', NO_CONTENT));
  }
  user.password = password;
  user.resetPasswordExpire = null;
  user.resetPasswordToken = null;
  await user.save();

  return res.status(OK).json({
    status: true,
    message: 'Reset password successfully.',
    data: null
  });
});
