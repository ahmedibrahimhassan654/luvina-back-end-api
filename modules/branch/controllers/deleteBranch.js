
const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');

const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');
const User = require('../../user/user.schema');
const { ROLE_BRANCH_MANAGER } = require('../../user/enum/roles');

//@desc  delete branch
//@route DELETE /api/v1/branches/:id
//@route private

module.exports = asyncHandler( async ( req, res, next ) =>
{
  
  
  try {
  //  const branch= await Branch.findByIdAndUpdate(req.branch.id,{businessAdmin: req.user._id},{active:false})

  //   if (!branch) {
  //     throw new ErrorResponse('branch Not found', BAD_REQUEST);
  //   }
    
    
  const branch = await Branch.findOneAndUpdate(
    {
      _id: branchId,
      businessAdmin: req.user._id
    },
    {
      $addToSet: { active:false }
    }
  );
  if (!branch) {
    throw new ErrorResponse('Branch Not found', BAD_REQUEST);
  }
    return res.status(CREATED).json({
      status: true,
      message: 'Branch deleted successfully',
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


//@desc  delete branch
//@route DELETE /api/v1/branches/:id
//@route private

// exports.deleteBranch = asyncHandler(async (req, res, next) => {
//     const branch = await Branch.findById(req.params.id);
//     if (!branch) {
//       return next(
//         new ErrorResponse(`no branch with the id of ${req.params.id}`),
//         404
//       );
//     }
//     await Branch.remove()
//   res.status( 200 ).json( {
//       message:'branch deleted ',
//       sucess: true,
//       data:{}
//     });
//   });
  