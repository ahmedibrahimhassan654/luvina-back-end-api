const express = require( 'express' )
const {
    creatCompany,
    deleteCompany,
    updateCompany,
    getCompany,
    getCompanies

} = require( '../controllers/companies' )
const router = express.Router()

router
    .route( '/' )
    .get( getCompanies)
    .post( creatCompany ) 

router
    .route( '/:id' )
    .get(getCompany)
    .put( updateCompany )
    .delete(deleteCompany)
module.exports=router