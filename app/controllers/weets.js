const { DatabaseError } = require('sequelize/lib/errors');
const geekJokesService = require('../services/geek_jokes');
const errors = require('../errors');
const logger = require('../logger');
const { WEET_GET_FOUND, WEET_GET_NOT_FOUND, WEET_CREATED, GET_WEETS_OK } = require('../../config/constants');
const WeetsServices = require('../services/weets');

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

const createWeet = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id: userId } = req.tokenMetaData;
    await WeetsServices.createWeet({ userId, content });
    return res.status(201).send({
      data: { content },
      message: WEET_CREATED
    });
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.errors) {
        const messages = err.errors.map(e => e.message);
        return next(errors.unprocessableEntity(messages));
      }
      return next(errors.unprocessableEntity(err.message));
    }
    return next(err);
  }
};

const getWeets = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const weets = await WeetsServices.getAllWeets({ offset, limit });
    return res.status(200).send({
      data: { weets },
      message: GET_WEETS_OK
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getWeet,
  createWeet,
  getWeets
};
