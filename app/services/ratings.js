const { Rating } = require('../models');

const getRatingById = ({ weetId, userId, transaction }) =>
  Rating.findOne({
    where: { weetId, userId },
    attributes: ['id', 'userId', 'weetId', 'score'],
    lock: transaction.LOCK.UPDATE,
    transaction
  });

const createRating = ({ weetId, userId, score }, transaction) =>
  Rating.create({ weetId, userId, score }, { transaction });

module.exports = {
  createRating,
  getRatingById
};
