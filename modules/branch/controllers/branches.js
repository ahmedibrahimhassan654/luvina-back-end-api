const ErrorResponse = require('../../../utils/errorRespnse');
const asyncHandler = require('../middleware/async');
const Branch = require('../models/branch');

// @desc  get branches
// @route GET /api/v1/branches
// @route GET /api/v1/companies/:companyId/branches
// @route public

exports.grtBranches = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.companyId) {
    query = Branch.find({ company: req.params.companyId });
  } else {
    query = Branch.find().populate({
      path: 'company',
      select: 'companyName description'
    });
  }
  const branches = await query;

  res.status(200).json({
    success: true,
    count: branches.length,
    data: branches
  });
});

// @desc  get single branch
// @route GET /api/v1/branch/:id
// @route public
exports.getBranch = asyncHandler(async (req, res, next) => {
  const branch = await Branch.findById(req.params.id).populate({
    path: 'company',
    select: 'companyName description'
  });
  if (!Branch) {
    return next(
      new ErrorResponse(`no branch with the id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    sucess: true,
    data: branch
  });
});
