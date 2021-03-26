/* eslint-disable no-unused-vars */
const faker = require('faker');

const { WEET_CREATED } = require('../../config/constants');

const createWeetInput = {
  content: 'No statement can catch the ChuckNorrisException'
};

const createBadWeedInput = { content: faker.lorem.word(140) };

const createBadWeedConstraint = {
  msg: "'content' must be greater than 1 and less than 140 characters",
  param: 'content',
  location: 'body',
  value: createBadWeedInput.content
};

const createWeetOutput = {
  data: {
    content: createWeetInput.content
  },
  message: WEET_CREATED
};

const createWeetMock = weet => Promise.resolve(true);

const countMock = 4;
const rowsMock = [
  {
    id: 1,
    content: createWeetInput.content,
    userId: 1
  },
  {
    id: 2,
    content: createWeetInput.content,
    userId: 1
  },
  {
    id: 3,
    content: createWeetInput.content,
    userId: 1
  },
  {
    id: 4,
    content: createWeetInput.content,
    userId: 1
  }
];

const getAllWeetsMock = pagination =>
  Promise.resolve({
    count: countMock,
    rows: rowsMock
  });

module.exports = {
  createWeetInput,
  createWeetOutput,
  createWeetMock,
  createBadWeedInput,
  createBadWeedConstraint,
  getAllWeetsMock,
  countMock,
  rowsMock
};
