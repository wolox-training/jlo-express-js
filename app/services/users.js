const { User } = require('../models');

const createUser = user => User.create(user);

const getUserByEmail = email => User.findOne({ where: { email } });

module.exports = {
  createUser,
  getUserByEmail
};
