/* eslint-disable no-useless-escape */
const Joi = require('@hapi/joi');

const businessType = require('../../business/enum/businessType');
const deliveryType = require('../../business/enum/deliveryType');
const salesType = require('../../business/enum/salesType');

module.exports = {
  /**
   * Customer signup schema
   */
  customerSignupSchema: {
    body: Joi.object()
      .required()
      .keys({
        fullName: Joi.string().required(),
        phoneNumber: Joi.string()
          .regex(/^(\+2)?01([0-9]{9})$/)
          .required(),
        email: Joi.string()
          .email()
          .optional(),
        password: Joi.string()
          .required()
          .min(6),
        dateOfBirth: Joi.date().optional(),
        address: Joi.object()
          .required()
          .keys({
            addressLine: Joi.string().optional(),
            country: Joi.string().optional(),
            province: Joi.string().optional()
          })
      })
  },

  /**
   * Business signup schema
   */
  businessSignupSchema: {
    body: Joi.object()
      .required()
      .keys({
        businessAdmin: Joi.object()
          .keys({
            fullName: Joi.string().required(),
            phoneNumber: Joi.string()
              .regex(/^(\+2)?01([0-9]{9})$/)
              .required(),
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string()
              .required()
              .min(6)
          })
          .required(),
        business: Joi.object()
          .keys({
            name: Joi.string().required(),
            address: Joi.object()
              .required()
              .keys({
                addressLine: Joi.string().optional(),
                country: Joi.string().optional(),
                province: Joi.string().optional()
              }),
            salesAddresses: Joi.array().items(
              Joi.object()
                .keys({
                  addressLine: Joi.string().optional(),
                  district: Joi.string().optional(),
                  country: Joi.string().optional(),
                  province: Joi.string().optional()
                })
                .required()
                .min(1)
            ),
            businessType: Joi.array().items(
              Joi.number()
                .valid(...Object.values(businessType))
                .required()
                .min(1)
            ),
            deliveryType: Joi.array().items(
              Joi.number()
                .valid(...Object.values(deliveryType))
                .required()
                .min(1)
            ),
            saleType: Joi.number()
              .valid(...Object.values(salesType))
              .required()
          })
          .required(),
        branches: Joi.array()
          .items(
            Joi.object().keys({
              name: Joi.string().required(),
              address: Joi.object()
                .required()
                .keys({
                  addressLine: Joi.string().optional(),
                  country: Joi.string().optional(),
                  province: Joi.string().optional()
                }),
              manager: Joi.object().keys({
                fullName: Joi.string().required(),
                phoneNumber: Joi.string()
                  .regex(/^(\+2)?01([0-9]{9})$/)
                  .required(),
                email: Joi.string()
                  .email()
                  .optional(),
                password: Joi.string()
                  .required()
                  .min(6)
              })
            })
          )
          .required()
          .min(1)
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
