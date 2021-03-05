const geekJokesService = require('../services/geek_jokes');
const errors = require('../errors');

const getWeet = async (req, res, next) => {
  try {
    const { data } = await geekJokesService.getGeekJoke();
    return res.status(200).send({ data });
  } catch (err) {
    return next(errors.notFound('Geek joke not found'));
  }
};

module.exports = {
  getWeet
};
