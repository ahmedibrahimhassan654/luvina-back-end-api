/* eslint-disable no-unused-vars */
const { OK, NO_CONTENT } = require('http-status-codes');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const generateOTP = require('../../../common/helpers/generate-otp');
const generateExpirationDate = require('../../../common/helpers/generate-expiration-date');
const ErrorResponse = require('../../../common/utils/errorResponse');
const sendSMS = require('../../../common/utils/sendSMS');

// @desc      Verify phone number
// @route     POST /api/v0/auth/phone/{phoneNumber}/verify
// @access    Public
module.exports = asyncHandler(async (req, res, next) => {
  const { phoneNumber } = req.params;

  const token = generateOTP();
  const tokenExpiration = generateExpirationDate();

  const user = await User.findOneAndUpdate(
    { phoneNumber },
    {
      $set: {
        'phoneVerification.token': token,
        'phoneVerification.tokenExpiration': tokenExpiration
      }
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new ErrorResponse('Phone number not found', NO_CONTENT));
  }

  const message = `Phone verification code: ${token}`;
  await sendSMS({ message, phoneNumber });

  return res.status(OK).json({
    status: true,
    message: 'Verification code sent to your phone number',
    data: null
  });
});
