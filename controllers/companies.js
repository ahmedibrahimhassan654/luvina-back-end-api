const ErrorResponse = require( './../utils/errorRespnse' )   
const asyncHandler=require('../middleware/async') 
const Company = require( '../models/company' )
    //@desc  get all companies
    //@route GET /api/v1/companies
    //@route public
exports.getCompanies =asyncHandler( async( req, res, next ) =>
{


    const companies = await Company.find()
  
    
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
    
        const company = await Company.findByIdAndDelete( req.params.id)
    
        if ( !company )
        {
            return next (new ErrorResponse(`company with that id ${req.params.id} not found`,404))
        }
    
        res.status( 200 ).json( {
            sucess: true,
            msg: `caompany with ${ req.params.id } deleted`,
            data:{}
        } )    
   
}
)
//add branche
//@desc  add branche
//@route DELETE /api/v1/companies/:id/branche
//@route private
exports.addBranche =asyncHandler( async ( req, res, next ) =>
{
   
        const newBranch=req.body
    
    const company = await Company.findByIdAndUpdate( req.params.id, req.body, {
        new: true,
        runValidators:true
    })
    
    company.branches.push( newBranch )
    await company.save()
    res.status( 200 ).json( {
        sucess: true,
        msg: ` new branche add to caompany with ${ req.params.id } `,
        data:company
    } )


})



exports.deletBranch=asyncHandler(async(req,res)=>
{
   const company= await Company.findByIdAndUpdate( req.params.id)
      
        // Get remove index
        const removeIndex = company.branches
          .map(branche => branche.id)
          .indexOf(req.params.bran_id);
        
       
        // Splice out of array
        company.branches.splice(removeIndex, 1);

        // Save
    company.save()
    
    res.status( 200 ).json( company)
      
} )
  
//update branche inside company
exports.updateBranche=asyncHandler(async(req,res)=>
{
   const company= await Company.findByIdAndUpdate( req.params.id)
      
        // Get remove index
        const updatedIndex = company.branches
          .map(branche => branche.id)
          .indexOf(req.params.bran_id);
        
       
           await company.update( {}, {$inc:{'branches.$[].std':-2}}, {multi: true})
       

   
    
        res.status( 200 ).json( {
            sucess: true,
            msg: `caompany with ${ req.params.id } updated`,
            data:company
        } ) 
      
  })