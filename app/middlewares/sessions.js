const { verifyToken } = require('../services/sessions');
const errors = require('../errors');
const { INVALID_TOKEN } = require('../../config/constants');

exports.authenticateSession = async (req, res, next) => {
  try {
    const bearerHeader = req.headers && req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      const tokenMetaData = await verifyToken(token);
      if (tokenMetaData) {
        // eslint-disable-next-line
        req.tokenMetaData = tokenMetaData;
        return next();
      }
    }
    return next(errors.unauthorized(INVALID_TOKEN));
  } catch (err) {
    return next(errors.unauthorized(INVALID_TOKEN));
  }
};
