const { PAGINATION_OFFSET, PAGINATION_LIMIT } = require('../../config/constants');
const { Weet } = require('../models');

const createWeet = weet => Weet.create(weet);

const getAllWeets = ({ offset = PAGINATION_OFFSET, limit = PAGINATION_LIMIT }) =>
  Weet.findAndCountAll({ offset, limit, attributes: ['id', 'content', 'userId'] });

const getWeetById = id => Weet.findOne({ where: { id } });

module.exports = {
  createWeet,
  getAllWeets,
  getWeetById
};
