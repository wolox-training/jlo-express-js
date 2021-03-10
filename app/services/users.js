const { User } = require('../models');

const createUser = user => User.create(user);

module.exports = {
  createUser
};
