const ErrorResponse = require( './../utils/errorRespnse' )   
const asyncHandler=require('../middleware/async') 
const Company = require( '../models/company' )
    //@desc  get all companies
    //@route GET /api/v1/companies
    //@route public
exports.getCompanies =asyncHandler( async( req, res, next ) =>
{


    const companies = await Company.find().populate('branches')
  
    
    res.status( 200 ).json( {
        numberOfCompanies:companies.length,
        sucess: true,
        msg: 'get all companies',
        data:companies
    } )
    
}
)

//@desc  get single company
//@route GET /api/v1/companies/:id
//@route public

exports.getCompany =asyncHandler( async ( req, res, next ) =>
{
    
        const company = await Company.findById ( req.params.id )
        

        if ( !company )
        {
            return next (new ErrorResponse(`company with that id ${req.params.id} not found`,404))

        }

    res.status( 200 ).json( {
           
            sucess: true,
            data: company
        })

    


}
)

//@desc  creat company
//@route post /api/v1/companies
//@route private

exports.creatCompany=asyncHandler( async ( req, res, next ) =>
{
    
        
        const company = await Company.create( req.body )
        res.status( 201 ).json( {
        sucess: true,
        data:company
    })  

  
}
)
//@desc  update  company
//@route put /api/v1/companies/:id
//@route private

exports.updateCompany =asyncHandler( async ( req, res, next ) =>
{
    
        const company = await Company.findByIdAndUpdate( req.params.id, req.body, {
            new: true,
            runValidators:true
        })
    
        if ( !company )
        {
            return next (new ErrorResponse(`company with that id ${req.params.id} not found`,404))
        }
    
        res.status( 200 ).json( {
            sucess: true,
            msg: `caompany with ${ req.params.id } updated`,
            data:company
        } )    
 
    
})

//@desc  delete  company
//@route DELETE /api/v1/companies/:id
//@route private

exports.deleteCompany=asyncHandler( async( req, res, next ) =>
{
    
        const company = await Company.findById( req.params.id)
    
        if ( !company )
        {
            return next (new ErrorResponse(`company with that id ${req.params.id} not found`,404))
        }
    
        company.remove();
    
        res.status( 200 ).json( {
            sucess: true,
            msg: `caompany with ${ req.params.id } deleted`,
            data:{}
        } )    
   
}
)
