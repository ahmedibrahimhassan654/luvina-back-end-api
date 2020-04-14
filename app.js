require('dotenv').config(); // This loads the defined variables from .env

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const swaggerDocs = require('./common/swagger');
const config = require('./common/config/config');
const passport = require('./common/config/passport');
const initApp = require('./common/init');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Express App
const app = express();
// Swagger URL
app.use('/api/v0/explore', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Used to enable CORS
app.use(cors());
// Protect against HTTP Parameter Pollution attacks
app.use(hpp());
// Sanitize data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
app.use(
  helmet.hsts({
    maxAge: 6 * 30 * 24 * 60 * 60,
    includeSubDomains: true,
    force: true
  })
);
// Prevent XSS attack
app.use(xss());
// Rate limiter to all requests
app.use(limiter);
app.use(
  morgan((tokens, req, res) => {
    return [
      `<pid : ${process.pid}> <${process.env.NODE_ENV}>`,
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms'
    ].join(' ');
  })
);
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(passport.initialize());
// Initialize app
initApp(app);

app.listen(config.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Luvina is up & running on port ${config.app.port} on environnement ${process.env.NODE_ENV}`
  );

  
  
});
