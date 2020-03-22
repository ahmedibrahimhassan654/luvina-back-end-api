const rp = require('request-promise');
const to = require('await-to-js').default;

const config = require('../config/config');

/**
 * @function
 * Send SMS via sms misr
 *
 * @param {object} data
 * @param {string} data.message - The message  to be sent.
 * @param {string|[String]} data.mobile - The mobile to sent to.
 */
module.exports = async data => {
  const mobile = Array.isArray(data.mobile)
    ? data.mobile.join(',')
    : data.mobile;
  const query = `?username=${config.smsMisr.userName}&password=${config.smsMisr.password}
  &language=${config.smsMisr.english}&sender=${config.smsMisr.sender}&mobile=${mobile}
  &message=${data.message}`;
  const options = {
    method: 'POST',
    uri: config.smsMisr.api,
    qs: {
      query
    },
    json: true // Automatically parses the JSON string in the response
  };

  const [err, result] = await to(rp(options));
  if (err) {
    throw new Error(err.message);
  }
  /**
   * Successful Response
   * { "code": "1901", "SMSID":7511, "vodafone": 0, "etisalat": 1, "orange": 0,
   * "we": 0, "Language": "English", "Vodafone_cost": 0, "Etisalat_cost": 1,
   * "orange_cost": 0, "we_cost": 0, }
   */

  return result;
};
