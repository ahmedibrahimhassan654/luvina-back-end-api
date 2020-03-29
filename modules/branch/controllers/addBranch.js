const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');
const Business = require('../../business/business.schema');

const User = require('../../user/user.schema');
const { ROLE_BRANCH_MANAGER } = require('../../user/enum/roles');
//@desc  add branch
//@route POST /api/v1/businesses/:businessId/branches
//@route private
// exports.addBranch = asyncHandler(async (req, res, next) => {
//     req.body.businessId = req.params.businessId

//     const business = await Business.findById( req.params.businessId )

//     if ( !business )
//     {
//         return next(
//           new ErrorResponse(`no branch with the id of ${req.params.businessId}`),
//           404
//         );
//     }
//     const branch=await Branch.create(req.body)
//       res.status(200).json({
//         sucess: true,
//         data: branch
//       });

//     })

exports.addBranch = asyncHandler(async (req, res, next) => {
  let { name, address, managerId } = req.body;

  // Create Business admin
  const newMang = new User({
    ...managerId,
    roles: [ROLE_BRANCH_MANAGER]
  });
  const newName = new Branch({
    ...name
  });
  const newaddress = new Branch({
    ...address
  });
  req.body.businessId = req.params.businessId;

  const business = await Business.findById(req.params.businessId);

  if (!business) {
    return next(
      new ErrorResponse(`no branch with the id of ${req.params.businessId}`),
      404
    );
  }

  const branch = await Branch.create(req.body);

  res.status(200).json({
    sucess: true,
    data: branch
  });
});
