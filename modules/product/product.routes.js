const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');
const {
  healthyCheck,
  addProductController,
  updateProductController,
  activateProductController
} = require('./controllers');
const {
  addProductSchema,
  updateProductSchema,
  activateProductSchema
} = require('./joi/validationSchemas');

const {
  PRODUCT_BUSINESS_ACTIVATE_PRODUCT,
  PRODUCT_BUSINESS_ADD_PRODUCT,
  PRODUCT_BUSINESS_UPDATE_PRODUCT
} = require('./endPoints');

const router = express.Router();

router.get('/healthy', healthyCheck);

router.post(
  '/business',
  isAuthorized(PRODUCT_BUSINESS_ADD_PRODUCT),
  requestValidator(addProductSchema),
  addProductController
);

// update product
router.put(
  '/business/:productId',
  isAuthorized(PRODUCT_BUSINESS_UPDATE_PRODUCT),
  requestValidator(updateProductSchema),
  updateProductController
);
router.put(
  '/business/:productId/activate',
  isAuthorized(PRODUCT_BUSINESS_ACTIVATE_PRODUCT),
  requestValidator(activateProductSchema),
  activateProductController
);

module.exports = router;
