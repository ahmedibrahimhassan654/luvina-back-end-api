const express = require('express');

const requestValidator = require('../../common/middleware/requestValidator');
const isAuthorized = require('../../common/middleware/isAuthorized');
const { healthyCheck } = require('./controllers');
//include other resource routes
const branchRouter = require( '../branch/branches.routes' );


const {} = require('./joi/validationSchemas');

const {} = require('./endPoints');

const router = express.Router();

//reroute into other resource router
router.use('/:businessId/branches', branchRouter);

router.get('/', healthyCheck);

module.exports = router;
