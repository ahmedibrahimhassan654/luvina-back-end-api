const customerRegisterController = require('./customer-register');
const loginController = require('./login');
const successCallbackController = require('./success-callback');
const verifyPhoneNumberController = require('./phone-verification');
const confirmPhoneNumberController = require('./phone-confirmation');
const verifyEmailController = require('./email-verification');
const confirmEmailController = require('./email-confirmation');
const forgetPasswordController = require('./password-forget');
const resetPasswordController = require('./password-reset');

module.exports = {
  customerRegisterController,
  loginController,
  successCallbackController,
  verifyPhoneNumberController,
  confirmPhoneNumberController,
  verifyEmailController,
  confirmEmailController,
  forgetPasswordController,
  resetPasswordController
};
