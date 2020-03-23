const companiesController = require( './companies' );
const emailConfirmationControler = require( './email-confirmation' ) 
const emailVerificationControler = require( './email-verification' )

const passwordForgetControler=require('./password-forget')  
const loginController = require('./login');
const successCallbackController = require('./success-callback');
const verifyPhoneNumberController = require('./phone-verification');
const confirmPhoneNumberController = require('./phone-confirmation');
const verifyEmailController = require('./email-verification');
const confirmEmailController = require('./email-confirmation');
const forgetPasswordController = require('./password-forget');
const resetPasswordController = require('./password-reset');

module.exports = {
  companiesController,
  emailConfirmationControler,
  emailVerificationControler,
  verifyPhoneNumberController,
  confirmPhoneNumberController,
  verifyEmailController,
  confirmEmailController,
  forgetPasswordController,
    resetPasswordController,
  passwordForgetControler,
  loginController,
  successCallbackController
  
};




