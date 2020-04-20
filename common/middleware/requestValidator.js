const { BAD_REQUEST } = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');
/**
 * @function
 * Middleware to validate the request using joi.
 *
 * @param {object} schema - Object contains validation schemas to the request
 */
module.exports = (schema) => {
  return (req, res, next) => {
    const validations = [];
    [('headers', 'params', 'query', 'body')].forEach((key) => {
      if (schema[key]) {
        const validation = schema[key].validate(req[key]);
        if (validation.error) {
          validations.push(validation.error.details[0].message);
        }
      }
    });
    if (validations.length) {
      return next(new ErrorResponse(validations.join(), BAD_REQUEST));
    }
    next();
  };
};
