const { sequelize } = require('../../models');
const WeetsService = require('../../services/weets');
const RatingsService = require('../../services/ratings');
const UsersService = require('../../services/users');
const { RESOURCE_DOES_NOT_EXIST } = require('../../../config/constants');
const errors = require('../../errors');

const validateWeet = async weetId => {
  const weet = await WeetsService.getWeetById(weetId);
  if (!weet) {
    throw errors.unprocessableEntity(RESOURCE_DOES_NOT_EXIST);
  }
  return weet;
};

const getRating = async (weetId, userId, score, transaction) => {
  let statusCode = null;
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
  return { rating, statusCode };
};

const updateUserPoints = async (weet, transaction) => {
  const user = await UsersService.getUserWeetPoints(weet.userId, transaction);
  const userPoints = UsersService.getUserPointsFromWeets(user.Weets);
  user.position = userPoints;
  await user.save({ transaction });
};

const rateWeet = async ({ weetId, userId, score }) => {
  let transaction = {};
  try {
    const weet = await validateWeet();
    transaction = await sequelize.transaction();
    const { rating, statusCode } = await getRating(weetId, userId, score, transaction);
    if (statusCode) {
      await updateUserPoints(weet, transaction);
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
  validateWeet,
  getRating,
  updateUserPoints
};
