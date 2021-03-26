const { RESOURCE_DOES_NOT_EXIST } = require('../../config/constants');
const { Rating, sequelize } = require('../models');
const WeetsService = require('./weets');
const UsersService = require('./users');
const errors = require('../errors');

const getRatingById = ({ weetId, userId, transaction }) =>
  Rating.findOne({
    where: { weetId, userId },
    attributes: ['id', 'userId', 'weetId', 'score'],
    lock: transaction.LOCK.UPDATE,
    transaction
  });

const rateWeet = async ({ weetId, userId, score }) => {
  let transaction = {};
  let statusCode = null;
  try {
    const weet = await WeetsService.getWeetById(weetId);
    if (!weet) {
      throw errors.unprocessableEntity(RESOURCE_DOES_NOT_EXIST);
    }
    transaction = await sequelize.transaction();
    let rating = await getRatingById({ weetId, userId, transaction });
    if (rating) {
      if (rating.score !== score) {
        rating.score = score;
        await rating.save({ transaction });
        statusCode = 200;
      }
    } else {
      rating = await Rating.create({ weetId, userId, score }, { transaction });
      statusCode = 201;
    }
    if (statusCode) {
      const user = await UsersService.getUserWeetPoints(weet.userId, transaction);
      const userPoints = UsersService.getUserPointsFromWeets(user.Weets);
      user.position = userPoints;
      await user.save({ transaction });
    }
    await transaction.commit();
    return { rating, statusCode: statusCode || 200 };
  } catch (err) {
    if (transaction.rollback) await transaction.rollback();
    throw err;
  }
};

module.exports = {
  rateWeet,
  getRatingById
};
