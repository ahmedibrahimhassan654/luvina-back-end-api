const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');

const {
  addBranchController,
  updateBranchController,
  activateBranchController,
  businessBranchesController,
  businessBranchController
} = require('./controllers');
const {
  addBranchSchema,
  updateBranchSchema,
  activateBranchSchema,
  businessBranchSchema
} = require('./joi/validationSchemas');
const {
  BRANCH_ADD_BRANCH,
  BRANCH_UPDATE_BRANCH,
  BRANCH_ACTIVATE_BRANCH,
  BRANCH_BUSINESS_BRANCHES,
  BRANCH_BUSINESS_BRANCH
} = require('./endPoints');

const router = express.Router();

router.post(
  '/:businessId/branch',
  isAuthorized(BRANCH_ADD_BRANCH),
  requestValidator(addBranchSchema),
  addBranchController
);
router.put(
  '/:businessId/:branchId',
  isAuthorized(BRANCH_UPDATE_BRANCH),
  requestValidator(updateBranchSchema),
  updateBranchController
);

router.put(
  '/activate/:branchId',
  isAuthorized(BRANCH_ACTIVATE_BRANCH),
  requestValidator(activateBranchSchema),
  activateBranchController
);

router.get(
  '/business',
  isAuthorized(BRANCH_BUSINESS_BRANCHES),
  businessBranchesController
);

router.get(
  '/business/:branchId',
  isAuthorized(BRANCH_BUSINESS_BRANCH),
  requestValidator(businessBranchSchema),
  businessBranchesController
);

module.exports = router;
