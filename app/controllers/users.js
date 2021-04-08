const errors = require('../errors');
const { createHash, validateWithHash } = require('../helpers/hashing');
const { CREATED, SIGN_IN_SUCCESSFUL, BAD_CREDENTIALS, GET_USERS_OK } = require('../../config/constants');
const { getToken } = require('../services/sessions');
const MailerService = require('../services/mailer');
const UserServices = require('../services/users');
const logger = require('../logger');

const createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;
    const hashCode = await createHash(userData.password);
    if (hashCode) userData.password = hashCode;
    await UserServices.createUser(userData);
    await MailerService.sendWelcomeEmail(userData);
    await MailerService.startCongratulationsMailJob(userData);
    return res.status(201).send({
      data: { name: userData.name },
      message: CREATED
    });
  } catch (err) {
    logger.info('Error creating user: ', err);
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
    if (!user) return next(errors.unauthorized(BAD_CREDENTIALS));
    const isValid = await validateWithHash(password, user.password);
    if (isValid) {
      const { id, name, lastName, role } = user;
      const token = getToken({ id, email, name, lastName, role });
      return res.status(200).send({
        data: { token },
        message: SIGN_IN_SUCCESSFUL
      });
    }
    return next(errors.unauthorized(BAD_CREDENTIALS));
  } catch (err) {
    return next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const users = await UserServices.getAllUsers({ offset, limit });
    return res.status(200).send({
      data: { users },
      message: GET_USERS_OK
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  signIn,
  getUsers
};
