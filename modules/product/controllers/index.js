const healthyCheck = require('./healthy');
const addProductController = require('./addProduct');
const updateProductController = require('./updateProduct');
const activateProductController = require('./activateProduct');
const getProductsController = require('./getAllProduct');
const getProductController = require('./getProduct');

module.exports = {
  healthyCheck,
  addProductController,
  updateProductController,
  activateProductController,
  getProductsController,
  getProductController
};
