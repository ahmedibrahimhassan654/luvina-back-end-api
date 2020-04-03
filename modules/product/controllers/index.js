const healthyCheck = require('./healthy');
const addProductController = require( './addProduct' );
const updateProductController = require('./updateProduct');
const isActivateProductControler=require('./actvateProduct')
module.exports = {
  healthyCheck,
  addProductController,
  updateProductController,
  isActivateProductControler
};
