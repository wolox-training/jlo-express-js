const { sequelize } = require('../../models');
const WeetsService = require('../../services/weets');
const RatingsService = require('../../services/ratings');
const UsersService = require('../../services/users');
const { RESOURCE_DOES_NOT_EXIST } = require('../../../config/constants');
const errors = require('../../errors');

const rateWeet = async ({ weetId, userId, score }) => {
  let transaction = {};
  try {
    let statusCode = null;
    const weet = await WeetsService.getWeetById(weetId);
    if (!weet) {
      throw errors.unprocessableEntity(RESOURCE_DOES_NOT_EXIST);
    }
    transaction = await sequelize.transaction();
    let rating = await RatingsService.getRatingById({ weetId, userId, transaction });
    if (rating) {
      if (rating.score !== score) {
        rating.score = score;
        await rating.save({ transaction, attributes: ['id', 'userId', 'weetId', 'score'] });
        statusCode = 200;
      }
    } else {
      rating = await RatingsService.createRating({ weetId, userId, score }, transaction);
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
  rateWeet
};
