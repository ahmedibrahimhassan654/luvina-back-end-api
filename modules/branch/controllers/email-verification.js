/* eslint-disable no-unused-vars */
const { OK, NO_CONTENT } = require('http-status-codes');
const cryptoRandomString = require('crypto-random-string');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const generateExpirationDate = require('../../../common/helpers/generate-expiration-date');
const ErrorResponse = require('../../../common/utils/errorResponse');
const sendMail = require('../../../common/utils/sendMail');
const config = require('../../../common/config/config');

// @desc      Verify email
// @route     POST /api/v0/auth/email/verify
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const token = cryptoRandomString({ length: 12, type: 'base64' });
  const tokenExpiration = generateExpirationDate();
  const encodedMail = Buffer.from(email).toString('base64');
  const link = `${req.protocol}://${req.get('host')}/${
    config.baseUrl
  }/auth/email/${encodedMail}/confirm/${token}`;
  const html = `Hello,<br> Please Click on the link to verify your email.
    <br><a href=${link}>Click here to verify</a>`;

  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        'emailVerification.token': token,
        'emailVerification.tokenExpiration': tokenExpiration
      }
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new ErrorResponse('Email not found', NO_CONTENT));
  }

  await sendMail({
    email,
    name: user.fullName,
    html,
    subject: 'Please confirm your Email account'
  });

  return res.status(OK).json({
    status: true,
    message: 'Verification link sent to your email',
    data: null
  });
});
