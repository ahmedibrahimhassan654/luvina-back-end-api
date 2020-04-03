const {
  AUTH_EMAIL_VERIFICATION,
  AUTH_EMAIL_CONFIRMATION,
  AUTH_PHONE_VERIFICATION,
  AUTH_PHONE_CONFIRMATION
} = require('../../../modules/auth/endPoints');

const {
  BRANCH_ADD_BRANCH,
  BRANCH_UPDATE_BRANCH,
  BRANCH_ACTIVATE_BRANCH,
  BRANCH_BUSINESS_BRANCH,
  BRANCH_BUSINESS_BRANCHES
} = require('../../../modules/branch/endPoints');
const {
  PRODUCT_ADD_PRODUCT,
  PRODUCT_UPDATE_PRODUCT,
  PRODUCT_ACTIVATE_PRODUCT
} = require('../../../modules/product/endPoints');

module.exports = [
  AUTH_EMAIL_VERIFICATION,
  AUTH_EMAIL_CONFIRMATION,
  AUTH_PHONE_VERIFICATION,
  AUTH_PHONE_CONFIRMATION,
  BRANCH_ADD_BRANCH,
  BRANCH_UPDATE_BRANCH,
  BRANCH_ACTIVATE_BRANCH,
  BRANCH_BUSINESS_BRANCH,

  BRANCH_BUSINESS_BRANCHES,

  PRODUCT_ADD_PRODUCT,
  PRODUCT_UPDATE_PRODUCT,
  PRODUCT_ACTIVATE_PRODUCT
];
