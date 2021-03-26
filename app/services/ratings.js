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
  let pointToAdd = 0;
  try {
    transaction = await sequelize.transaction();
    const weet = await WeetsService.getWeetById(weetId);
    if (!weet) {
      if (transaction.rollback) await transaction.rollback();
      throw errors.unprocessableEntity(RESOURCE_DOES_NOT_EXIST);
    }
    let weetRating = await getRatingById({ weetId, userId, transaction });
    if (weetRating) {
      if (weetRating.score !== score) {
        weetRating.score = score;
        await weetRating.save({ transaction });
        pointToAdd = score;
      }
    } else {
      weetRating = await Rating.create({ weetId, userId, score }, { transaction });
      pointToAdd = score;
    }
    if (pointToAdd) {
      const user = await UsersService.getUserWeetPoints(weet.userId, transaction);
      const userPoints = UsersService.getUserPointsFromWeets(user.Weets);
      user.position = userPoints;
      await user.save({ transaction });
    }
    await transaction.commit();
    return weetRating;
  } catch (err) {
    if (transaction.rollback) await transaction.rollback();
    throw err;
  }
};

module.exports = {
  rateWeet,
  getRatingById
};
