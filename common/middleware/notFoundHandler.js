const { NOT_FOUND } = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');

// @desc Not found resources handler
const notFoundHandler = (req, res, next) => {
  next(new ErrorResponse('Resource Not Found', NOT_FOUND));
};

module.exports = notFoundHandler;
