const conf = require('./swagger-conf');
const definitions = require('./swagger-definitions');
const security = require('./security-schemes');
const auth = require('./docs/auth-docs');

const swaggerDocs = {
  ...conf,
  paths: { ...auth },
  components: { schemas: { ...definitions }, securitySchemes: { ...security } }
};
module.exports = swaggerDocs;
