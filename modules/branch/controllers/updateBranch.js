const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');

//@desc  upadte branch
//@route put /api/v1/businesses/:businessId/branches
//@route private

exports.updateBranch = asyncHandler(async (req, res, next) => {
    let branch = await Branch.findById(req.params.id);
    if (!branch) {
      return next(
        new ErrorResponse(`no branch with the id of ${req.params.id}`),
        404
      );
    }
    branch = await Branch.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators:true
    })
  res.status( 200 ).json( {
      message:'branch updated ',
      sucess: true,
      data: branch
    });
  });
  