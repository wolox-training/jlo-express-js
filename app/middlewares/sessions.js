const { verifyToken } = require('../services/sessions');
const errors = require('../errors');
const { INVALID_TOKEN, ADMIN_ROUTE_PATTERN, ADMIN_ROLE } = require('../../config/constants');

const getBearerToken = authHeader =>
  authHeader.startsWith('Bearer ') ? authHeader.substring(7, authHeader.length) : null;

const verifyRole = (url, pattern) => pattern.test(url);

exports.authenticateSession = async (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    const bearerToken = getBearerToken(authHeader);
    if (bearerToken) {
      const tokenMetaData = await verifyToken(bearerToken);
      if (tokenMetaData) {
        const isAdminRoute = verifyRole(req.url, ADMIN_ROUTE_PATTERN);
        if (isAdminRoute && tokenMetaData.role !== ADMIN_ROLE) {
          return next(errors.unauthorized(INVALID_TOKEN));
        }
        Object.assign(req, { tokenMetaData });
        return next();
      }
    }
    return next(errors.unauthorized(INVALID_TOKEN));
  } catch (err) {
    return next(errors.unauthorized(INVALID_TOKEN));
  }
};
