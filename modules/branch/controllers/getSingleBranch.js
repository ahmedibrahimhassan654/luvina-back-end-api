const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');

//@desc  get single branch
//@route GET /api/v1/branch/:id
//@route public
exports.getBranch = asyncHandler(async (req, res, next) => {
  const branch = await Branch.findById(req.params.id);
  if (!branch) {
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
