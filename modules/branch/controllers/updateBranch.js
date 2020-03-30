// const ErrorResponse = require('../../../common/utils/errorResponse');
// const asyncHandler = require('../../../common/middleware/async');
// const Branch = require('../branch.schema');


// //@desc  upadte branch
// //@route put /api/v1/api/v1/branches/:id
// //@route private

// exports.updateBranch = asyncHandler(async (req, res, next) => {
//     let branch = await Branch.findById(req.params.id);
//     if (!branch) {
//       return next(
//         new ErrorResponse(`no branch with the id of ${req.params.id}`),
//         404
//       );
//     }
//     branch = await Branch.findByIdAndUpdate( req.params.id, req.body, {
//         new: true,
//         runValidators:true
//     })
//   res.status( 200 ).json( {
//       message:'branch updated ',
//       sucess: true,
//       data: branch
//     });
//   });
  
const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');

module.exports = asyncHandler( async ( req, res, next ) =>
{
  

  try {
    // let branch = await Branch.findById(req.params.id);
    // if (!business) {
    //   throw new ErrorResponse('Business Not found', BAD_REQUEST);
    // }
    // branch = await Branch.findByIdAndUpdate( req.params.id, {businessAdmin: req.user._id},req.body, {
    //     new: true,
    //     runValidators:true
    // })
    const branch = await Branch.findOneAndUpdate(
      {
        _id: branchId,
        businessAdmin: req.user._id
      },
      {
        $addToSet: { branches: branchId }
      }
    );
    if (!branch) {
      throw new ErrorResponse('Branch Not found', BAD_REQUEST);
    }
    return res.status(CREATED).json({
      status: true,
      message: 'branch updated successfully',
      data: null
    });
  } catch (err) {
  
    return next(
      new ErrorResponse(
        err.message,
        err.status || INTERNAL_SERVER_ERROR,
        err.stack
      )
    );
  }
});
