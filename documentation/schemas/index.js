const utils = require('./utils');
const user = require('./user');
const weet = require('./weet');
const admin = require('./admin');
const sessions = require('./sessions');
const ratings = require('./ratings');

module.exports = {
  ...utils,
  ...user,
  ...weet,
  ...sessions,
  ...admin,
  ...ratings,
  Error: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      },
      internal_code: {
        type: 'string'
      }
    }
  }
};
