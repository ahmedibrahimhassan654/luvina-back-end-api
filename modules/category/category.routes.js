const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');
const {
  healthyCheck,
  addCategoryController,
  activateCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController
} = require('./controllers');
const {
  addCategorySchema,
  activateCategorySchema,
  getCategorySchema,
  updateCategorySchema
} = require('./joi/validationSchemas');

const {
  CATEGORY_ADD_CATEGORY,
  CATEGORY_ACTIVATE_CATEGORY,
  CATEGORY_GET_CATEGORIES,
  CATEGORY_GET_CATEGORY,
  CATEGORY_UPDATE_CATEGORY
} = require('./endPoints');

const router = express.Router();

router.get('/healthy', healthyCheck);

router.post(
  '/',
  isAuthorized(CATEGORY_ADD_CATEGORY),
  requestValidator(addCategorySchema),
  addCategoryController
);

router.put(
  '/:id/activate',
  isAuthorized(CATEGORY_ACTIVATE_CATEGORY),
  requestValidator(activateCategorySchema),
  activateCategoryController
);

router.get(
  '/',
  isAuthorized( CATEGORY_GET_CATEGORIES ),
  getCategoriesController );

router.get(
  '/:id',
  isAuthorized(CATEGORY_GET_CATEGORY),
  requestValidator(getCategorySchema),
  getCategoryController
);

router.put(
  '/:id',
  isAuthorized(CATEGORY_UPDATE_CATEGORY),
  requestValidator(updateCategorySchema),
  updateCategoryController
);

module.exports = router;
