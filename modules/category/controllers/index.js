const healthyCheck = require('./healthy');
const addCategoryController = require('./add-category');
const activateCategoryController = require('./activate-category');
const getCategoriesController = require('./get-categories');
const getCategoryController = require('./get-category');
const updateCategoryController = require('./update-category');

module.exports = {
  healthyCheck,
  addCategoryController,
  activateCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController
};
