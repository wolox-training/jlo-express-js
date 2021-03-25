const { RESOURCE_DOES_NOT_EXIST } = require('../../config/constants');
const { Rating, sequelize } = require('../models');
const WeetsServices = require('./weets');
const UserServices = require('./users');
const errors = require('../errors');

const rateWeet = async ({ weetId, userId, score }) => {
  let transaction = {};
  try {
    transaction = await sequelize.transaction();
    const weet = await WeetsServices.getWeetById(weetId);
    const user = await UserServices.getUserById(userId);
    if (!weet || !user) {
      if (transaction.rollback) await transaction.rollback();
      throw errors.unprocessableEntity(RESOURCE_DOES_NOT_EXIST);
    }
    let weetRating = await getRatingById({ weetId, userId });
    if (weetRating) {
      if (weetRating.score && weetRating.score !== score) {
        weetRating.score = score;
        await weetRating.save(transaction);
      }
    } else {
      weetRating = await Rating.create({ weetId, userId, score }, { transaction });
    }
    // Conseguir todos los weets de
    // const userRating = await getUserRating();
    // console.log(userRating);
    await transaction.commit();
  } catch (err) {
    if (transaction.rollback) await transaction.rollback();
    throw err;
  }
};

const getRatingById = ({ weetId, userId }) => Rating.findOne({ where: { weetId, userId } });

const getUserRating = userId =>
  Rating.findAll({
    where: { userId },
    attributes: [sequelize.fn('SUM', sequelize.col('score'), 'userRating')]
  });

module.exports = {
  rateWeet,
  getRatingById,
  getUserRating
};
