    const Company=require('../models/company')
    //@desc  get all companies
    //@route GET /api/v1/companies
    //@route public
exports.getCompanies = ( req, res, next ) =>
{

console.log(req.body);

 
    res.status( 200 ).json( {
            sucess: true,
            msg: 'show all companies'
        } )
    }

//@desc  get single company
//@route GET /api/v1/companies/:id
//@route public

exports.getCompany = ( req, res, next ) =>
{
    res.status( 200 ).json( {
        sucess: true, msg: `caompany with ${ req.params.id } `
    } )
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
        res.status(400).json({sucess:false})
    }
  
}

//@desc  update  company
//@route put /api/v1/companies/:id
//@route private

exports.updateCompany= ( req, res, next ) =>
{
    res.status( 200 ).json( {
        sucess: true,
        msg: `caompany with ${ req.params.id } updated`
    } )    
}

//@desc  delete  company
//@route DELETE /api/v1/companies/:id
//@route private

exports.deleteCompany= ( req, res, next ) =>
{
    res.status( 200 ).json( {
        sucess: true,
        msg: `caompany with ${ req.params.id } deleted`
    } )
}