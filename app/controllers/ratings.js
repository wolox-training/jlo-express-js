const { CREATED } = require('../../config/constants');
const { rateWeet } = require('../services/ratings');

const createRating = async (req, res, next) => {
  try {
    const { id: weetId } = req.params;
    const { score } = req.body;
    const { id: userId } = req.tokenMetaData;
    const rating = await rateWeet({ weetId, userId, score });
    return res.status(200).send({
      data: {
        rating
      },
      message: CREATED
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createRating
};
