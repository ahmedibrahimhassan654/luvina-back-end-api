/* eslint-disable no-useless-escape */
const Joi = require('@hapi/joi');

module.exports = {
  /**
   * Add branch schema
   */
  addBranchSchema: {
    params: Joi.object().keys({
      businessId: Joi.string().required()
    }),
    body: Joi.object().keys({
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
  },
  /**
   * Update branch schema
   */
  updateBranchSchema: {
    params: Joi.object().keys({
      businessId: Joi.string().required(),
      branchId: Joi.string().required()
    }),
    body: Joi.object().keys({
      name: Joi.string().required(),
      address: Joi.object()
        .required()
        .keys({
          addressLine: Joi.string().optional(),
          country: Joi.string().optional(),
          province: Joi.string().optional()
        }),
      managerId: Joi.string().required()
    })
  },
  /**
   * Activate branch schema
   */
  activateBranchSchema: {
    params: Joi.object().keys({
      branchId: Joi.string().required()
    }),
    body: Joi.object().keys({
      isActive: Joi.boolean().required()
    })
  },
  /**
   * Business branch schema
   */
  businessBranchSchema: {
    params: Joi.object().keys({
      branchId: Joi.string().required()
    })
  }
};
