/* eslint-disable no-unused-vars */

const faker = require('faker');
const { UNPROCESSABLE_ENTITY } = require('../../app/errors');
const { RESOURCE_DOES_NOT_EXIST, CREATED, UPDATED } = require('../../config/constants');

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
    content: faker.lorem.word(100),
    userId: 1
  });

const getNullRatingByIdMock = data => Promise.resolve(null);

const getRatingByIdMock = data =>
  Promise.resolve({
    id: 1,
    userId: 1,
    weetId: 1,
    score: -1,
    save: () => Promise.resolve(true)
  });

const getUserWeetPointsMock = (id, transaction) =>
  Promise.resolve({
    Weets: [
      { dataValues: { weetScore: 5 } },
      { dataValues: { weetScore: 2 } },
      { dataValues: { weetScore: 1 } }
    ],
    save: () => Promise.resolve(true)
  });

const createRatingOutput = {
  data: {
    rating: {
      id: 1,
      userId: 1,
      weetId: 1,
      score: 1
    }
  },
  message: CREATED
};

const updateRatingOutput = {
  data: {
    rating: {
      id: 1,
      userId: 1,
      weetId: 1,
      score: 1
    }
  },
  message: UPDATED
};

const createRatingMock = ({ weetId, userId, score }, transaction) =>
  Promise.resolve({
    id: 1,
    userId,
    weetId,
    score
  });

module.exports = {
  createRatingInput,
  unproccesableRating,
  getNullWeetByIdMock,
  getWeetByIdMock,
  getRatingByIdMock,
  getNullRatingByIdMock,
  getUserWeetPointsMock,
  createRatingMock,
  createRatingOutput,
  updateRatingOutput
};
