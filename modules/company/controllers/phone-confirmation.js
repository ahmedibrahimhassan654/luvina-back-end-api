/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const { OK, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const moment = require('moment');

const asyncHandler = require('../../../common/middleware/async');
const User = require('../../user/user.schema');
const ErrorResponse = require('../../../common/utils/errorResponse');

// @desc      Confirm phone number
// @route     POST /api/v0/auth/phone/{phoneNumber}/confirm
// @access    Public
module.exports = async (req, res, next) => {
  try {
    const { phoneNumber } = req.params;
    const { token } = req.body;

    const user = await User.findOne({ phoneNumber }).lean();
    if (!user) {
      return next(new ErrorResponse('Phone number not found', NO_CONTENT));
    }

    if (
      String(user.phoneVerification.token) === String(token) &&
      moment().isBefore(user.phoneVerification.tokenExpiration)
    ) {
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            'phoneVerification.isVerified': true,
            'phoneVerification.token': null,
            'phoneVerification.tokenExpiration': null
          }
        },
        { new: true, runValidators: true }
      );
      return res.status(OK).json({
        status: true,
        message: 'Phone number confirmed successfully',
        data: null
      });
    }

    return next(
      new ErrorResponse('Phone number not found or invalid token', NO_CONTENT)
    );
  } catch (err) {
    next(new ErrorResponse(err.message, err.status || INTERNAL_SERVER_ERROR));
  }
};

// https://github.com/Automattic/mongoose/issues/6050
// https://docs.mongodb.com/manual/reference/operator/update/set/#set-fields-in-embedded-documents
// https://mongoosejs.com/docs/subdocs.html
// https://stackoverflow.com/questions/23832921/updating-nested-object-in-mongoose

// https://stackoverflow.com/questions/47735867/mongoose-querying-subdocuments
