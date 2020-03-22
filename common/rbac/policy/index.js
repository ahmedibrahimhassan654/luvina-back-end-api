const {
  ROLE_CUSTOMER,
  ROLE_SUPER_ADMIN,
  ROLE_ASSISTANT,
  ROLE_DOCTOR
} = require('../../../modules/user/roles');
const superAdminPolicy = require('./superAdmin');
const doctorPolicy = require('./doctor');
const assistantPolicy = require('./assistant');
const customerPolicy = require('./customer');

const opts = {
  [ROLE_SUPER_ADMIN]: {
    // list of allowed operations
    can: superAdminPolicy
  },
  [ROLE_DOCTOR]: {
    // list of allowed operations
    can: doctorPolicy
  },
  [ROLE_CUSTOMER]: {
    // list of allowed operations
    can: customerPolicy
  },
  [ROLE_ASSISTANT]: {
    // list of allowed operations
    can: assistantPolicy
  }
};

module.exports = opts;
