const { validationResult } = require('express-validator');
const errors = require('../errors');

exports.validateRequest = schema => [
  schema,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(errors.badRequest(result.array()));
    }
    return next();
  }
];
