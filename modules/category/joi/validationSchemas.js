const Joi = require('@hapi/joi');

module.exports = {
  /**
   * Add Category schema
   */
  addCategorySchema: {
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().optional(),
        icon: Joi.string().optional()
      })
  },
  /**
   * Activate category schema
   */
  activateCategorySchema: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    body: Joi.object().keys({
      isActive: Joi.boolean().required()
    })
  },

  /**
   * Get category schema
   */
  getCategorySchema: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  /**
   * Update Category schema
   */
  updateCategorySchema: {
    params: Joi.object().keys({
      id: Joi.string().required()
    }),
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().optional(),
        icon: Joi.string().optional(),
        isActive: Joi.boolean().required()
      })
  }
};
