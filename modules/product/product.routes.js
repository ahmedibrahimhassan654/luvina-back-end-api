const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');
const { healthyCheck, addProductController } = require('./controllers');
const { addProductSchema } = require('./joi/validationSchemas');

const { PRODUCT_ADD_PRODUCT } = require('./endPoints');

const router = express.Router();

router.get('/healthy', healthyCheck);

router.post(
  '/:branchId/product',
  isAuthorized(PRODUCT_ADD_PRODUCT),
  requestValidator(addProductSchema),
  addProductController
);

module.exports = router;
