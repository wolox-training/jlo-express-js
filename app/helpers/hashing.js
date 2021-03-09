const bcryp = require('bcryptjs');
const { PASSWORD_SALT } = require('../../config/constants');

const createHash = (val, salt = PASSWORD_SALT) => bcryp.hash(val, salt);

module.exports = {
  createHash
};
