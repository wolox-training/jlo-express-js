const { check } = require('express-validator');
const {
  VALIDATE_EXISTS,
  VALIDATE_IS_NUMERIC,
  VALIDATE_SCORE_IS_IN,
  validationMessage,
  RATING_SCORES
} = require('../../config/constants');

exports.createRatingValidator = [
  check('score')
    .exists()
    .withMessage(validationMessage('score', VALIDATE_EXISTS))
    .custom(value => {
      if (typeof value !== 'number') {
        return Promise.reject(validationMessage('score', VALIDATE_IS_NUMERIC));
      }
      if (!RATING_SCORES.includes(value)) {
        return Promise.reject(validationMessage('score', VALIDATE_SCORE_IS_IN));
      }
      return Promise.resolve(value);
    })
];
