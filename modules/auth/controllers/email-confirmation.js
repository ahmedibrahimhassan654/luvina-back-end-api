/* eslint-disable no-unused-vars */
const { OK, NO_CONTENT } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Confirm email
// @route     Post /api/v0/auth/email/{encodedMail}/confirm
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { encodedMail } = req.params;
  const { token } = req.body;
  const email = Buffer.from(encodedMail, 'base64').toString('ascii');

  const user = await User.findOneAndUpdate(
    {
      email,
      'emailVerification.token': token,
      'emailVerification.tokenExpiration': { $gt: Date.now() }
    },
    {
      $set: {
        'emailVerification.isVerified': true,
        'emailVerification.token': null,
        'emailVerification.tokenExpiration': null
      }
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(
      new ErrorResponse('Email not found or invalid token', NO_CONTENT)
    );
  }

  return res.status(OK).json({
    status: true,
    message: 'Email confirmed successfully',
    data: null
  });
});
