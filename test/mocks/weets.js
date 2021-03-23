/* eslint-disable no-unused-vars */

const { BAD_REQUEST } = require('../../app/errors');
const { WEET_CREATED } = require('../../config/constants');

const createWeetInput = {
  content: 'No statement can catch the ChuckNorrisException'
};

const createBadWeedInput = {
  content:
    'abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi a'
};

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

// const createBadWeetMock = weet => Promise.resolve(true);

module.exports = {
  createWeetInput,
  createWeetOutput,
  createWeetMock,
  createBadWeedInput,
  createBadWeedConstraint
};
