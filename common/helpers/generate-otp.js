/**
 * Generates random OTP
 * @function
 *
 * @returns {number} - Generated OTP random number
 */
function generateOTP() {
  return 100000 + Math.floor(Math.random() * 900000);
}

module.exports = generateOTP;
