/**
 * Generates expiration date
 * @function
 *
 * @param {number} days - Number of days
 *
 * @returns {Date} - Generated expiration date
 */
function generateExpirationDate(days = 2) {
  return Date.now() + Math.abs(3600000 * days);
}

module.exports = generateExpirationDate;
