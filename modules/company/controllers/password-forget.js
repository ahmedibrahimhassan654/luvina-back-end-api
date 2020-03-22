/* eslint-disable no-unused-vars */
const { OK, NO_CONTENT } = require('http-status-codes');
const crypto = require('crypto');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const generateExpirationDate = require('../../../common/helpers/generate-expiration-date');
const ErrorResponse = require('../../../common/utils/errorResponse');
const sendMail = require('../../../common/utils/sendMail');
const config = require('../../../common/config/config');

// @desc      Forget password
// @route     POST /api/v0/auth/forget-password
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const resetPasswordExpire = generateExpirationDate(1);
  const token = crypto.randomBytes(20).toString('hex');
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        resetPasswordToken,
        resetPasswordExpire
      }
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new ErrorResponse('Email not found', NO_CONTENT));
  }

  const link = `${req.protocol}://${req.get('host')}${
    config.baseUrl
  }/auth/reset-password/${token}`;
  const html = `Hello,<br> Please Click on the link to reset your password.
    <br><a href=${link}>Click here to reset</a>`;

  await sendMail({
    email,
    name: user.fullName,
    html,
    subject: 'Please reset your password'
  });

  return res.status(OK).json({
    status: true,
    message: 'Reset password link sent successfully',
    data: null
  });
});
