const { moment } = require('../../config/moment');
const { verifyToken } = require('../services/sessions');
const errors = require('../errors');
const { INVALID_TOKEN } = require('../../config/constants');

const getBearerToken = authHeader =>
  authHeader.startsWith('Bearer ') ? authHeader.substring(7, authHeader.length) : null;

exports.authenticateSession = async (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    const bearerToken = getBearerToken(authHeader);
    if (bearerToken) {
      const tokenMetaData = await verifyToken(bearerToken);
      if (tokenMetaData) {
        if (tokenMetaData.exp && tokenMetaData.exp <= moment().valueOf()) {
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
