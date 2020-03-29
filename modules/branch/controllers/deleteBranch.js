const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');


//@desc  delete branch
//@route DELETE /api/v1/branches/:id
//@route private

exports.deleteBranch = asyncHandler(async (req, res, next) => {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return next(
        new ErrorResponse(`no branch with the id of ${req.params.id}`),
        404
      );
    }
    await Branch.remove()
  res.status( 200 ).json( {
      message:'branch deleted ',
      sucess: true,
      data:{}
    });
  });
  