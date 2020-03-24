/* eslint-disable no-unused-vars */
const { OK } = require('http-status-codes');

// @desc Business health check
module.exports = (req, res, next) => {
  return res.status(OK).json({
    success: true,
    message: 'Business is up & running.',
    data: null
  });
};
