const {
  AUTH_EMAIL_VERIFICATION,
  AUTH_EMAIL_CONFIRMATION,
  AUTH_PHONE_VERIFICATION,
  AUTH_PHONE_CONFIRMATION
} = require('../../../modules/auth/endPoints');

const {
  CATEGORY_ACTIVATE_CATEGORY,
  CATEGORY_ADD_CATEGORY,
  CATEGORY_GET_CATEGORIES,
  CATEGORY_GET_CATEGORY,
  CATEGORY_UPDATE_CATEGORY
} = require('../../../modules/category/endPoints');
const {
 
  PRODUCT_GET_GETPRODUCTS
} = require('../../../modules/product/endPoints');
module.exports = [
  AUTH_EMAIL_VERIFICATION,
  AUTH_EMAIL_CONFIRMATION,
  AUTH_PHONE_VERIFICATION,
  AUTH_PHONE_CONFIRMATION,
  CATEGORY_ACTIVATE_CATEGORY,
  CATEGORY_ADD_CATEGORY,
  CATEGORY_GET_CATEGORIES,
  CATEGORY_GET_CATEGORY,
  CATEGORY_UPDATE_CATEGORY,
  PRODUCT_GET_GETPRODUCTS
];
