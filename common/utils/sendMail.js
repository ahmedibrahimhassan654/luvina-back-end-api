const to = require('await-to-js').default;
const sgMail = require('@sendgrid/mail');

const config = require('../config/config');

sgMail.setApiKey(config.sendGrid.SENDGRID_API_KEY);

/**
 * @function
 * Send mail via send grid
 *
 * @param {object} data
 * @param {string} data.message - The message  to be sent.
 * @param {string} data.name - The recipient  name.
 * @param {string} data.email - The email address to sent to.
 * @param {string} data.subject - The email subject.
 * @param {string} data.html - The email html.
 */
module.exports = async (data) => {
  const msg = {
    to: data.email,
    from: config.sendGrid.fromMail,
    subject: data.subject,
    text: data.html
  };
  const [err, result] = await to(sgMail.send(msg));
  if (err) {
    throw new Error(err.message);
  }

  return result;
};
