const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.UNPROCESSABLE_ENTITY = 'unprocessable_entity';
exports.unprocessableEntity = message => internalError(message, exports.UNPROCESSABLE_ENTITY);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.NOT_FOUND = 'not_found_error';
exports.notFound = message => internalError(message, exports.NOT_FOUND);

exports.UNAUTHORIZED = 'unauthorized';
exports.unauthorized = message => internalError(message, exports.UNAUTHORIZED);

exports.BAD_REQUEST = 'bad_request';
exports.badRequest = message => internalError(message, exports.BAD_REQUEST);
