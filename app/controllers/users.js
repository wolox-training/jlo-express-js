const UserServices = require('../services/users');
const errors = require('../errors');
const { createHash } = require('../helpers/hashing');
const { CREATED } = require('../../config/constants');

const createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;
    const hashCode = await createHash(userData.password);
    if (hashCode) userData.password = hashCode;
    await UserServices.createUser(userData);
    return res.status(201).send({
      data: { name: userData.name },
      message: CREATED
    });
  } catch (err) {
    if (err.errors) {
      const messages = err.errors.map(e => e.message);
      return next(errors.unprocessableEntity(messages));
    }
    return next(errors.unprocessableEntity(err.message));
  }
};

module.exports = {
  createUser
};
