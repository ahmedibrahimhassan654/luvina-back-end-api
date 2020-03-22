/* eslint-disable no-useless-escape */
const Joi = require('@hapi/joi');

module.exports = {
  /**
   * Customer register schema
   */
  customerRegisterSchema: {
    body: Joi.object()
      .required()
      .keys({
        fullName: Joi.string().required(),
        phoneNumber: Joi.string()
          .regex(/^(\+2)?01([0-9]{9})$/)
          .required(),
        userName: Joi.string().required(),
        email: Joi.string().optional(),
        password: Joi.string()
          .required()
          .min(6),
        photo: Joi.string().optional()
      })
  },
  /**
   * Login schema
   */
  loginSchema: {
    body: Joi.object()
      .required()
      .keys({
        userName: Joi.string().required(),
        password: Joi.string().required()
      })
  },
  /**
   * Phone verification schema
   */
  phoneVerificationSchema: {
    params: Joi.object()
      .required()
      .keys({
        phoneNumber: Joi.string()
          .regex(/^(\+2)?01([0-9]{9})$/)
          .required()
      })
  },
  /**
   * Phone confirmation schema
   */
  phoneConfirmationSchema: {
    params: Joi.object()
      .required()
      .keys({
        phoneNumber: Joi.string()
          .regex(/^(\+2)?01([0-9]{9})$/)
          .required()
      }),
    body: Joi.object()
      .required()
      .keys({
        token: Joi.string().required()
      })
  },
  /**
   * Email verification schema
   */
  emailVerificationSchema: {
    body: Joi.object()
      .required()
      .keys({
        email: Joi.string()
          .regex(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          .required()
      })
  },
  /**
   * Email confirmation schema
   */
  emailConfirmationSchema: {
    params: Joi.object()
      .required()
      .keys({
        encodedMail: Joi.string().required()
      }),
    body: Joi.object()
      .required()
      .keys({
        token: Joi.string().required()
      })
  },
  /**
   * Forget password schema
   */
  forgetPasswordSchema: {
    body: Joi.object()
      .required()
      .keys({
        email: Joi.string()
          .regex(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
          .required()
      })
  },
  /**
   * Reset password schema
   */
  resetPasswordSchema: {
    params: Joi.object()
      .required()
      .keys({
        token: Joi.string().required()
      }),
    body: Joi.object()
      .required()
      .keys({
        password: Joi.string()
          .min(6)
          .required()
      })
  }
};
