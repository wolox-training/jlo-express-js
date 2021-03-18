const errors = require('../errors');
const { INVALID_TOKEN, ADMIN_ROLE } = require('../../config/constants');

exports.verifyAdmin = (req, res, next) => {
  try {
    if (req.tokenMetaData && req.tokenMetaData.role !== ADMIN_ROLE) {
      return next(errors.unauthorized(INVALID_TOKEN));
    }
    return next();
  } catch (err) {
    return next(errors.unauthorized(INVALID_TOKEN));
  }
};
