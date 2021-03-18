const { CREATED, UPDATED, ADMIN_ROLE } = require('../../config/constants');
const UserServices = require('../services/users');
const { createHash } = require('../helpers/hashing');
const errors = require('../errors');

const createOrUpdateAdminUser = async (req, res, next) => {
  try {
    const { body: userData } = req;
    const user = await UserServices.getUserByEmail(userData.email);
    if (!user) {
      const hashCode = await createHash(userData.password);
      if (hashCode) userData.password = hashCode;
      Object.assign(userData, { role: ADMIN_ROLE });
      await UserServices.createUser(userData);
      return res.status(201).send({
        data: { name: userData.name },
        message: CREATED
      });
    }
    user.role = ADMIN_ROLE;
    await user.save();
    return res.status(200).send({
      data: { name: user.name },
      message: UPDATED
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
  createOrUpdateAdminUser
};
