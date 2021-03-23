const { Weet } = require('../models');

const createWeet = weet => Weet.create(weet);

module.exports = {
  createWeet
};
