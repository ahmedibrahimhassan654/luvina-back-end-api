const addBranchController = require('./addBranch');
const updateBranchController = require('./updateBranch');
const activateBranchController = require('./activateBranch');
const businessBranchesController = require('./getBusinessBranches');
const businessBranchController = require('./getBusinessBranch');

module.exports = {
  addBranchController,
  updateBranchController,
  activateBranchController,
  businessBranchesController,
  businessBranchController
};
