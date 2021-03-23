const { check } = require('express-validator');
const {
  VALIDATE_NOT_EMPTY,
  VALIDATE_IS_STRING,
  VALIDATE_EXISTS,
  MAX_WEET_LENGTH,
  MIN_WEET_LENGTH,
  VALIDATE_MIN_MAX_LENGTH,
  validationMessage
} = require('../../config/constants');

exports.createWeetValidator = [
  check('content')
    .exists()
    .withMessage(validationMessage('content', VALIDATE_EXISTS))
    .isString()
    .withMessage(validationMessage('content', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validationMessage('content', VALIDATE_NOT_EMPTY))
    .isLength({ min: MIN_WEET_LENGTH, max: MAX_WEET_LENGTH })
    .withMessage(validationMessage('content', VALIDATE_MIN_MAX_LENGTH))
];
