const { check } = require('express-validator');
const {
  validationMessage,
  VALIDATE_EXISTS,
  VALIDATE_IS_STRING,
  VALIDATE_NOT_EMPTY,
  VALIDATE_EMAIL_MATCHES,
  VALIDATE_PASSWORD_MATCHES
} = require('../../config/constants');

const emailRegex = /^[a-zA-Z0-9_.+-]+@wolox\.(mx|co|cl|com|com\.ar)$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z_.+\-@$!%*#?&])([a-zA-Z0-9_.+\-@$!%*#?&]){8,}$/;

exports.createUserValidator = [
  check('name')
    .exists()
    .withMessage(validationMessage('name', VALIDATE_EXISTS))
    .isString()
    .withMessage(validationMessage('name', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validationMessage('name', VALIDATE_NOT_EMPTY)),
  check('lastName')
    .exists()
    .withMessage(validationMessage('lastName', VALIDATE_EXISTS))
    .isString()
    .withMessage(validationMessage('lastName', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validationMessage('lastName', VALIDATE_NOT_EMPTY)),
  check('email')
    .exists()
    .withMessage(validationMessage('email', VALIDATE_EXISTS))
    .isString()
    .withMessage(validationMessage('email', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validationMessage('email', VALIDATE_NOT_EMPTY))
    .matches(emailRegex)
    .withMessage(validationMessage('email', VALIDATE_EMAIL_MATCHES)),
  check('password')
    .exists()
    .withMessage(validationMessage('password', VALIDATE_EXISTS))
    .isString()
    .withMessage(validationMessage('password', VALIDATE_IS_STRING))
    .notEmpty()
    .withMessage(validationMessage('password', VALIDATE_NOT_EMPTY))
    .matches(passwordRegex)
    .withMessage(validationMessage('password', VALIDATE_PASSWORD_MATCHES))
];
