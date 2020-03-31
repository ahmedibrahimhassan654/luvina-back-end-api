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
      categoryId: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required()
      }),
      
      image: Joi.string().required(),
      gallery: Joi.array().items(Joi.string()),
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      currency: Joi.number()
        .valid(...Object.values(currency))
        .required(),

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
