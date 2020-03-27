const config = require('../config/config');
const healthCheck = require('../middleware/healthCheck');
const notFoundHandler = require('../middleware/notFoundHandler');
const errorHandler = require('../middleware/errorHandler');
// Route files
const authRoutes = require('../../modules/auth/auth.routes');
const businessRoute = require('../../modules/company/companies.routes');
const cartRoutes = require('../../modules/cart/cart.routes');
const productRoutes = require('../../modules/product/product.routes');
const orderRoutes = require('../../modules/order/order.routes');
const reviewRoutes = require('../../modules/review/review.routes');

/**
 * @function
 * Registers all app routes
 *
 * @param {object} app - Express app.
 */
module.exports = (app) => {
  // Mount routers
  // eslint-disable-next-line no-unused-vars
  app.get(`${config.baseUrl}/health`, healthCheck);
  app.use(`${config.baseUrl}/auth`, authRoutes);
  app.use(`${config.baseUrl}/businesses`, businessRoute);
  app.use(`${config.baseUrl}/carts`, cartRoutes);
  app.use(`${config.baseUrl}/products`, productRoutes);
  app.use(`${config.baseUrl}/orders`, orderRoutes);
  app.use(`${config.baseUrl}/reviews`, reviewRoutes);

  // Handling Not Found
  app.use(notFoundHandler);

  // Central error handler
  app.use(errorHandler);
};
