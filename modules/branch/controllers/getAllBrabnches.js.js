const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');

// @desc  get single branch
// @route GET /api/v1/branch/:id
// @route public
exports.grtBranches = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.advancedResults);
});
