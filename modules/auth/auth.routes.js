const express = require('express');

const passport = require('passport');
const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');
const {
  customerRegisterController,
  loginController,
  successCallbackController,
  verifyPhoneNumberController,
  confirmPhoneNumberController,
  verifyEmailController,
  confirmEmailController,
  forgetPasswordController,
  resetPasswordController
} = require('./controllers');
const {
  customerRegisterSchema,
  loginSchema,
  phoneVerificationSchema,
  phoneConfirmationSchema,
  emailVerificationSchema,
  emailConfirmationSchema,
  forgetPasswordSchema,
  resetPasswordSchema
} = require('./joi/validationSchemas');

const {
  AUTH_EMAIL_VERIFICATION,
  AUTH_EMAIL_CONFIRMATION,
  AUTH_PHONE_VERIFICATION,
  AUTH_PHONE_CONFIRMATION
} = require('./endPoints');

const router = express.Router();

router.post(
  '/register',
  requestValidator(customerRegisterSchema),
  customerRegisterController
);
router.post('/login', requestValidator(loginSchema), loginController);
router.post(
  '/phone/:phoneNumber/verify',
  isAuthorized(AUTH_PHONE_VERIFICATION),
  requestValidator(phoneVerificationSchema),
  verifyPhoneNumberController
);
router.post(
  '/phone/:phoneNumber/confirm',
  isAuthorized(AUTH_PHONE_CONFIRMATION),
  requestValidator(phoneConfirmationSchema),
  confirmPhoneNumberController
);
router.post(
  '/email/verify',
  isAuthorized(AUTH_EMAIL_VERIFICATION),
  requestValidator(emailVerificationSchema),
  verifyEmailController
);
router.post(
  '/email/:encodedMail/confirm',
  isAuthorized(AUTH_EMAIL_CONFIRMATION),
  requestValidator(emailConfirmationSchema),
  confirmEmailController
);
router.post(
  '/forget-password',
  requestValidator(forgetPasswordSchema),
  forgetPasswordController
);
router.put(
  '/reset-password/:token',
  requestValidator(resetPasswordSchema),
  resetPasswordController
);
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
    failureRedirect: '/login'
  }),
  successCallbackController
);

// Redirect the user to Facebook for authentication
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    session: false,
    scope: [
      'public_profile',
      'id',
      'displayName',
      'email',
      'first_name',
      'last_name',
      'link'
    ]
  })
);
// Facebook will redirect the user to this URL after approval.
// If access was granted, the user will be logged in. Otherwise authentication has failed.
router.get(
  '/facebook/callback',
  passport.authenticate(
    'facebook',
    {
      failureRedirect: '/login'
    },
    successCallbackController
  )
);

router.get(
  '/linkedin',
  passport.authenticate('linkedin', { scope: ['profile'] })
);

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', {
    scope: ['profile', 'email'],
    failureRedirect: '/login'
  }),
  successCallbackController
);

module.exports = router;
