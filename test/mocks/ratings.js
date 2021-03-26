/* eslint-disable no-unused-vars */

const { UNPROCESSABLE_ENTITY } = require('../../app/errors');
const { RESOURCE_DOES_NOT_EXIST } = require('../../config/constants');

const createRatingInput = {
  score: 1
};

const unproccesableRating = {
  message: RESOURCE_DOES_NOT_EXIST,
  internal_code: UNPROCESSABLE_ENTITY
};

const getNullWeetByIdMock = id => Promise.resolve(null);

const getWeetByIdMock = id =>
  Promise.resolve({
    id: 1,
    content: '',
    userId: 1
  });

module.exports = {
  createRatingInput,
  unproccesableRating,
  getNullWeetByIdMock,
  getWeetByIdMock
};
