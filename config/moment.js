const moment = require('moment-timezone');
const { TIME_ZONE } = require('./constants');

moment.tz(TIME_ZONE);

module.exports = {
  moment
};
