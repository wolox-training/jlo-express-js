const { PAGINATION_OFFSET, PAGINATION_LIMIT } = require('../../config/constants');
const { User, Weet, Rating, sequelize } = require('../models');

const createUser = user => User.create(user);

const getUserByEmail = email => User.findOne({ where: { email } });

const getAllUsers = ({ offset = PAGINATION_OFFSET, limit = PAGINATION_LIMIT }) =>
  User.findAndCountAll({
    offset,
    limit,
    attributes: ['id', 'name', 'lastName', 'email', 'role', 'position']
  });

const getUserWeetPoints = (id, transaction) =>
  User.findOne({
    where: { id },
    group: ['User.id', 'Weets.id'],
    attributes: ['id'],
    include: [
      {
        model: Weet,
        attributes: [
          [sequelize.cast(sequelize.fn('SUM', sequelize.col('Weets->Ratings.score')), 'int'), 'weetScore']
        ],
        include: {
          attributes: [],
          model: Rating
        }
      }
    ],
    transaction
  });

const getUserPointsFromWeets = weets => weets.reduce((a, k) => a + k.dataValues.weetScore, 0);

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserWeetPoints,
  getUserPointsFromWeets
};
