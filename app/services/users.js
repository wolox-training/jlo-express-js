const { PAGINATION_OFFSET, PAGINATION_LIMIT } = require('../../config/constants');
const { User } = require('../models');

const createUser = user => User.create(user);

const getUserByEmail = email => User.findOne({ where: { email } });

const getAllUsers = ({ offset = PAGINATION_OFFSET, limit = PAGINATION_LIMIT }) =>
  User.findAndCountAll({ offset, limit, attributes: ['id', 'name', 'lastName', 'email', 'role'] });

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers
};
