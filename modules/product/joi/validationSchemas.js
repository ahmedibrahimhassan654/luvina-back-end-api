const Joi = require('@hapi/joi');
const currencyEnum = require('../enum/currency');

module.exports = {
  /**
   * Add product schema
   */
  addProductSchema: {
    body: Joi.object().keys({
      categoryId: Joi.string().required(),
      branchId: Joi.string().required(),
      image: Joi.string().required(),
      gallery: Joi.array()
        .items(Joi.string())
        .optional(),
      name: Joi.string().required(),
      price: Joi.number()
        .required()
        .min(0),
      description: Joi.string().required(),
      currency: Joi.string()
        .valid(...Object.values(currencyEnum))
        .optional(),
      sale: Joi.number()
        .optional()
        .min(0)
        .max(100),
      isSaleActive: Joi.boolean().required(),
      stock: Joi.number()
        .required()
        .min(1)
    })
  },

  updateProductSchema: {
    params: Joi.object().keys({
      productId: Joi.string().required()
    }),
    body: Joi.object().keys({
      categoryId: Joi.string().required(),
      branchId: Joi.string().required(),
      image: Joi.string().required(),
      gallery: Joi.array()
        .items(Joi.string())
        .optional(),
      name: Joi.string().required(),
      price: Joi.number()
        .required()
        .min(0),
      description: Joi.string().required(),
      currency: Joi.string()
        .valid(...Object.values(currencyEnum))
        .optional(),
      sale: Joi.number()
        .optional()
        .min(0)
        .max(100),
      isSaleActive: Joi.boolean().required(),
      stock: Joi.number()
        .required()
        .min(1),
      isActive: Joi.boolean().required()
    })
  },
  /**
   * Activate product schema
   */
  activateProductSchema: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    body: Joi.object().keys({
      isActive: Joi.boolean().required()
    })
  }
};
