const grtBranches = require('./getAllBranches.js');
const getBranch = require('./getSingleBranch');
const addBranchController = require('./addBranch');
const updateBranch = require('./updateBranch');
const deleteBranch = require('./deleteBranch');

module.exports = {
  grtBranches,
  getBranch,
  addBranchController,
  updateBranch,
  deleteBranch
};
