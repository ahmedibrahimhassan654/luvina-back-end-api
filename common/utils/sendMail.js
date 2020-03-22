const to = require('await-to-js').default;
const mandrill = require('node-mandrill');
const { promisify } = require('util');

const config = require('../config/config');

const request = promisify(mandrill(config.manDrill.apiKey));

/**
 * @function
 * Send mail via mail chimp
 *
 * @param {object} data
 * @param {string} data.message - The message  to be sent.
 * @param {string} data.name - The recipient  name.
 * @param {string} data.email - The email address to sent to.
 * @param {string} data.subject - The email subject.
 * @param {string} data.html - The email html.
 */
module.exports = async data => {
  const [err, result] = await to(
    request('/messages/send', {
      message: {
        to: [{ email: data.email, name: data.name }],
        from_email: config.manDrill.fromMail,
        subject: data.subject,
        text: data.html
      }
    })
  );
  if (err) {
    throw new Error(err.message);
  }

  return result;
};
