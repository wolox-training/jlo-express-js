const utils = require('./utils');
const user = require('./user');
const weet = require('./weet');
const sessions = require('./sessions');

module.exports = {
  ...utils,
  ...user,
  ...weet,
  ...sessions,
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
