    const Company=require('../models/company')
    //@desc  get all companies
    //@route GET /api/v1/companies
    //@route public
exports.getCompanies = async( req, res, next ) =>
{

try {
    const companies = await Company.find()
    
    res.status( 200 ).json( {
        numberOfCompanies:companies.length,
        sucess: true,
        msg: 'get all companies',
        data:companies
    } )

} catch (error) {
    res.status(400).json({sucess:false})
}

 
    
    }

//@desc  get single company
//@route GET /api/v1/companies/:id
//@route public

exports.getCompany =async ( req, res, next ) =>
{
    try {
        const company = await Company.findById ( req.params.id )
        

        if ( !company )
        {
            return res.status( 400 ).json( {
                success: false,
                msg:`ther is no company with that id `
               
            })
        }

        res.status( 200 ).json( {
            sucess: true,
            data: company
        })

    } catch (error) {
        res.status(400).json({sucess:false})
    }


}

//@desc  creat company
//@route post /api/v1/companies
//@route private

exports.creatCompany= async ( req, res, next ) =>
{
    try {
        const company = await Company.create( req.body )
        res.status( 201 ).json( {
        sucess: true,
        data:company
    })  
    } catch (error) {
        res.status( 400 ).json( { sucess: false } )
        console.log(error);
        
    }
  
}

//@desc  update  company
//@route put /api/v1/companies/:id
//@route private

exports.updateCompany = async ( req, res, next ) =>
{
    try {
        const company = await Company.findByIdAndUpdate( req.params.id, req.body, {
            new: true,
            runValidators:true
        })
    
        if ( !company )
        {
           return res.status( 400 ).json( {
                success: false,
                msg:`somthing wrong `
            })
        }
    
        res.status( 200 ).json( {
            sucess: true,
            msg: `caompany with ${ req.params.id } updated`,
            data:company
        } )    
    } catch (error) {
        res.status( 400 ).json( { sucess: false } )
       
    }
    
}

//@desc  delete  company
//@route DELETE /api/v1/companies/:id
//@route private

exports.deleteCompany= async( req, res, next ) =>
{
    try {
        const company = await Company.findByIdAndDelete( req.params.id)
    
        if ( !company )
        {
           return res.status( 400 ).json( {
                success: false,
              
            })
        }
    
        res.status( 200 ).json( {
            sucess: true,
            msg: `caompany with ${ req.params.id } deleted`,
            data:{}
        } )    
    } catch (error) {
        res.status( 400 ).json( { sucess: false } )
        console.log(error);
    }
}
exports.addBranche = async ( req, res, next ) =>
{
    const newBranch=req.body
    
 const company=await Company.findOne({company:req.company.id})





}