const config = require('../config/config');

// eslint-disable-next-line import/order
const client = require('twilio')(
  config.twilio.accountSID,
  config.twilio.authToken
);

/**
 * @function
 * Send SMS via twilio
 *
 * @param {object} data
 * @param {string} data.message - The message to be sent.
 * @param {string} data.phoneNumber - The mobile to sent to.
 */
module.exports = async (data) => {
  try {
    const { phoneNumber, message } = data;
    const result = await client.messages.create({
      body: message,
      // from: config.twilio.phoneNumber,
      to: `+2${phoneNumber}`
    });
    // eslint-disable-next-line no-console
    console.log(`@SMS: ${JSON.stringify(result)}`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error while sending message', err.message);
  }
};
