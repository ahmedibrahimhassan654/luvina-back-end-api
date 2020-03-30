const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');

const { addBranchController,updateBranch } = require('./controllers');
const { addBranchSchema ,updateBranchSchema} = require('./joi/validationSchemas');
const { BRANCH_ADD_BRANCH ,BRANCH_UPDATE_BRANCH} = require('./endPoints');

const router = express.Router();
router.post(
  '/:businessId/branch',
  isAuthorized(BRANCH_ADD_BRANCH),
  requestValidator(addBranchSchema),
  addBranchController
);
router.put(
    '/:id',
    isAuthorized(BRANCH_UPDATE_BRANCH),
    requestValidator(updateBranchSchema),
    updateBranch
  );



    
module.exports = router;
