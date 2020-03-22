const {
  UNAUTHORIZED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');
const passport = require('passport');

const ErrorResponse = require('../utils/errorResponse');
const rbac = require('../rbac/rbac');

const isAuthorized = endPointName => {
  return (req, res, next) => {
    try {
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer')
      ) {
        return next(new ErrorResponse('Unauthorized', UNAUTHORIZED));
      }
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return next(new ErrorResponse('Unauthorized', UNAUTHORIZED));
      }
      passport.authenticate('jwt', { session: false }, async (err, user) => {
        if (err) {
          return next(new ErrorResponse(err.message, INTERNAL_SERVER_ERROR));
        }
        req.user = user;
        const isAllowed = await rbac.can(req.user.roles, endPointName);
        if (!isAllowed) {
          return next(
            new ErrorResponse(
              'Access to the requested URL is Forbidden',
              FORBIDDEN
            )
          );
        }
        return next();
      })(req, res, next);
    } catch (err) {
      return next(new ErrorResponse(err.message, INTERNAL_SERVER_ERROR));
    }
  };
};

module.exports = isAuthorized;
