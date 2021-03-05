const geekJokesService = require('../services/geek_jokes');
const errors = require('../errors');
const logger = require('../logger');
const { WEET_GET_FOUND, WEET_GET_NOT_FOUND } = require('../../config/constants');

const getWeet = async (req, res, next) => {
  try {
    const { data } = await geekJokesService.getGeekJoke();
    logger.info(`getGeekJoke() response:\n ${JSON.stringify(data)}`);
    return res.status(200).send({
      data,
      message: WEET_GET_FOUND
    });
  } catch (err) {
    return next(errors.notFound(WEET_GET_NOT_FOUND));
  }
};

module.exports = {
  getWeet
};
