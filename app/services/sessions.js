const jwt = require('jwt-simple');
const config = require('../../config');

const secret = config.common && config.common.session && config.common.session.secret;

const getToken = meta => jwt.encode(meta, secret);

module.exports = {
  getToken
};
