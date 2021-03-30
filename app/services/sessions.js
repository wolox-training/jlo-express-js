const jwt = require('jwt-simple');
const { moment } = require('../../config/moment');
const config = require('../../config');
const { JWT_EXPIRATION_TIME } = require('../../config/constants');

const secret = config.common && config.common.session && config.common.session.secret;

const getToken = meta =>
  jwt.encode(
    {
      ...meta,
      exp: moment()
        .add(JWT_EXPIRATION_TIME, 'hours')
        .valueOf()
    },
    secret
  );

const verifyToken = token => jwt.decode(token, secret);

module.exports = {
  getToken,
  verifyToken
};
