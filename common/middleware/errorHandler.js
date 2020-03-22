/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

// @desc Error handler
const errorHandler = (err, req, res, next) => {
  console.error(
    `Message: ${JSON.stringify(err.message)}, Stack: ${JSON.stringify(
      err.stack
    )}`
  );
  return res.status(err.status || INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Internal Server Error',
    data: null
  });
};

module.exports = errorHandler;
