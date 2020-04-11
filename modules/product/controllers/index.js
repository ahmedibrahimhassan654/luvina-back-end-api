const healthyCheck = require('./healthy');
const addProductController = require('./addProduct');
const updateProductController = require('./updateProduct');
const activateProductController = require( './activateProduct' );
const getProducts = require( './gettAllProduct' );
const getProductController = require('./getProduct')

module.exports = {
  healthyCheck,
  addProductController,
  updateProductController,
  activateProductController,
  getProducts,
  getProductController
};
