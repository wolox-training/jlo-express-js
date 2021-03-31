/* eslint-disable no-unused-vars */

const { UNPROCESSABLE_ENTITY } = require('../../app/errors');
const { EMAIL_GENERAL_ERROR } = require('../../config/constants');

const sendWelcomeEmailMock = ({ name, lastName, email }) => Promise.resolve(true);

const sendBadWelcomeEmailMock = ({ name, lastName, email }) => Promise.reject(new Error(EMAIL_GENERAL_ERROR));

const unproccesableSendEmail = {
  message: EMAIL_GENERAL_ERROR,
  internal_code: UNPROCESSABLE_ENTITY
};

module.exports = {
  sendWelcomeEmailMock,
  sendBadWelcomeEmailMock,
  unproccesableSendEmail
};
