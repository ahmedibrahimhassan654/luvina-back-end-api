const express = require( 'express' )
const {
    creatCompany,
    deleteCompany,
    updateCompany,
    getCompany,
    getCompanies,
    addBranche,
    deletBranch,
    updateBranche

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
    .delete( deleteCompany )
    
router.route( '/:id/branche' ).put( addBranche )
router.route( '/:id/branche/:bran_id' ).delete( deletBranch )
router.route('/:id/branche/:bran_id').put(updateBranche)
module.exports=router