const express = require('express');
const {
  creatCompany,
  deleteCompany,
  updateCompany,
  getCompany,
  getCompanies
} = require('./controllers');

// include other resource routes
const branchRouter = require('../branch/branches.routes');

const router = express.Router();

// // Re-route into other resource routers
// router.use('/:companyId/branches', branchRouter);

// router
//   .route('/')
//   .get(getCompanies)
//   .post(creatCompany);

// router
//   .route('/:id')
//   .get(getCompany)
//   .put(updateCompany)
//   .delete(deleteCompany);

module.exports = router;
