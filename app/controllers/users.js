const UserServices = require('../services/users');
const errors = require('../errors');
const { createHash, validateWithHash } = require('../helpers/hashing');
const { CREATED, SIGN_IN_SUCCESSFUL, BAD_CREDENTIALS } = require('../../config/constants');
const { getToken } = require('../services/sessions');

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

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserServices.getUserByEmail(email);
    const isValid = await validateWithHash(password, user.password);
    if (isValid) {
      const { id, name, lastName } = user;
      const token = getToken({ id, email, name, lastName });
      return res.status(200).send({
        data: { token },
        message: SIGN_IN_SUCCESSFUL
      });
    }
    return next(errors.badRequest(BAD_CREDENTIALS));
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  signIn
};
