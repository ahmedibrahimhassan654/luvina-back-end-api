const ErrorResponse = require('../../../common/utils/errorResponse');
const asyncHandler = require('../../../common/middleware/async');
const Branch = require('../branch.schema');



// @desc  get single branch
// @route GET /api/v1/branch/:id
// @route public
exports.grtBranches = asyncHandler( async ( req, res, next ) =>
{
    let query;
    if ( req.params.businessId )
    {
        query = Branch.find( { businessId: req.params.businessId } )
    } else
    {
        query = Branch.find().populate({
          path: 'business',
          select:'name'
      })
    }
    const branches = await query
    
    res.status( 200 ).json( {
        success: true,
        count: branches.length,
        data:branches
    })
})
