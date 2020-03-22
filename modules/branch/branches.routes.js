const express = require( 'express' )
const {
   grtBranches
} = require( '../controllers/branches' )
const router = express.Router({mergeParams:true})

router.route( '/' ).get( grtBranches )

module.exports = router;

