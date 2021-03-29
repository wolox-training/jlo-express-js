const { CREATED, UPDATED } = require('../../config/constants');
const { rateWeet } = require('../services/transactions/ratings');

const createRating = async (req, res, next) => {
  try {
    const { id: weetId } = req.params;
    const { score } = req.body;
    const { id: userId } = req.tokenMetaData;
    const { rating, statusCode } = await rateWeet({ weetId, userId, score });
    return res.status(statusCode).send({
      data: { rating },
      message: statusCode === 201 ? CREATED : UPDATED
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createRating
};
