const express = require( 'express' )
const {
    creatCompany,
    deleteCompany,
    updateCompany,
    getCompany,
    getCompanies,
} = require( '../controllers/companies' )

//include other resource routes
const branchRouter=require('./branches')

 

const router = express.Router()

//Re-route into other resource routers
router.use( '/:companyId/branches', branchRouter )


router
    .route( '/' )
    .get( getCompanies)
    .post( creatCompany ) 

router
    .route( '/:id' )
    .get(getCompany)
    .put( updateCompany )
    .delete( deleteCompany )
    

module.exports=router