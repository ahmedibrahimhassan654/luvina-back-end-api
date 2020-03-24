const {
  ROLE_CUSTOMER,
  ROLE_SUPER_ADMIN,
  ROLE_BUSINESS_ADMIN
} = require('../../../modules/user/enum/roles');
const superAdminPolicy = require('./superAdmin');
const businessAdminPolicy = require('./businessAdmin');
const customerPolicy = require('./customer');

const opts = {
  [ROLE_SUPER_ADMIN]: {
    // list of allowed operations
    can: superAdminPolicy
  },
  [ROLE_BUSINESS_ADMIN]: {
    // list of allowed operations
    can: businessAdminPolicy
  },
  [ROLE_CUSTOMER]: {
    // list of allowed operations
    can: customerPolicy
  }
};

module.exports = opts;
