const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');
const { healthyCheck, addProductController,updateProductController } = require('./controllers');
const { addProductSchema,updateProductSchema } = require('./joi/validationSchemas');

const { PRODUCT_ADD_PRODUCT,PRODUCT_UPDATE_PRODUCT } = require('./endPoints');

const router = express.Router();

router.get('/healthy', healthyCheck);
//create product
router.post(
  '/:branchId/product',
  isAuthorized(PRODUCT_ADD_PRODUCT),
  requestValidator(addProductSchema),
  addProductController
);

//update product
router.put(
  '/:productId',
  isAuthorized(PRODUCT_UPDATE_PRODUCT),
  requestValidator( updateProductSchema ),
  updateProductController
 
);

module.exports = router;
