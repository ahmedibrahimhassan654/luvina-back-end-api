/* eslint-disable no-useless-escape */
const currency = require('../enum/currency');
const Joi = require('@hapi/joi');

module.exports = {
  /**
   * Add product schema
   */
  addProductSchema: {
    params: Joi.object().keys({
      branchId: Joi.string().required()
    }),
    body: Joi.object().keys({
      categoryId: Joi.string().required(),
      
      image: Joi.string().required(),
      gallery: Joi.array().items(Joi.string()),
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      currency: Joi.string()
        .valid(...Object.values(currency))
        .optional(),

      sale: Joi.number()
        .optional()
        .min(0)
        .max(100),
      stock: Joi.number()
        .optional()
        .min(0)
    })
  }
};
