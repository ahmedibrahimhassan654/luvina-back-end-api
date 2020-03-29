const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');

const { addBranchController } = require('./controllers');
const { addBranchSchema } = require('./joi/validationSchemas');
const { BRANCH_ADD_BRANCH } = require('./endPoints');

const router = express.Router();
router.post(
  '/:businessId/branch',
  isAuthorized(BRANCH_ADD_BRANCH),
  requestValidator(addBranchSchema),
  addBranchController
);

module.exports = router;
