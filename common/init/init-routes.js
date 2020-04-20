const config = require('../config/config');
const healthCheck = require('../middleware/healthCheck');
const notFoundHandler = require('../middleware/notFoundHandler');
const errorHandler = require('../middleware/errorHandler');
const initSocket = require('../../modules/socket');
// Route files
const authRoutes = require('../../modules/auth/auth.routes');
const businessRoute = require('../../modules/business/business.routes');
const cartRoutes = require('../../modules/cart/cart.routes');
const productRoutes = require('../../modules/product/product.routes');
const orderRoutes = require('../../modules/order/order.routes');
const reviewRoutes = require('../../modules/review/review.routes');
const branchRoutes = require('../../modules/branch/branches.routes');

/**
 * @function
 * Registers all app routes
 *
 * @param {object} app - Express app.
 * @param {object} server - Http server.
 */
module.exports = (app, server) => {
  const io = initSocket(server);
  app.use((req, res, next) => {
    res.io = io;
    next();
  });
  // Mount routers
  app.get(`${config.baseUrl}/health`, healthCheck);
  app.use(`${config.baseUrl}/auth`, authRoutes);

  app.use(`${config.baseUrl}/businesses`, businessRoute);
  app.use(`${config.baseUrl}/branches`, branchRoutes);
  app.use(`${config.baseUrl}/carts`, cartRoutes);
  app.use(`${config.baseUrl}/products`, productRoutes);
  app.use(`${config.baseUrl}/orders`, orderRoutes);
  app.use(`${config.baseUrl}/reviews`, reviewRoutes);

  // Handling Not Found
  app.use(notFoundHandler);

  // Central error handler
  app.use(errorHandler);
};
