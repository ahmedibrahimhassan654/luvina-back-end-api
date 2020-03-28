const express = require('express');

const  {grtBranches}  = require('./controllers/getAllBrabnches.js');
const {getBranch}= require('./controllers/getSingleBranch')
const {addBranch}=require('./controllers/addBranch')
const router = express.Router( { mergeParams: true } );

router.route( '/' )
    .get( grtBranches )
    .post( addBranch )

router.route( '/:id' )
    .get( getBranch )
    
module.exports = router;
