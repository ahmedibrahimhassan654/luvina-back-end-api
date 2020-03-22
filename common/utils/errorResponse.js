/**
 * @class
 * @classdesc Error response class to be used over the app.
 */
class ErrorResponse extends Error {
  /**
   * Create an error response.
   * @param {string} message - The error message.
   * @param {number} status - The error code.
   * @param {string} stack - The error stack.
   */
  constructor(message, status, stack = 'Not Specified') {
    super(message);
    this.status = status;
    this.stack = stack;
  }
}

module.exports = ErrorResponse;
